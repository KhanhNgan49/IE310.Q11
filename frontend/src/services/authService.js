import { data } from 'react-router-dom';
import { api } from './axiosServices';

const authService = {
  // Đăng nhập người dùng
  login: async (email, password) => {
    try {
      const response = await api.post('/users/login', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      // Chỉ log thông tin lỗi, không throw lỗi mới để không hiện đỏ trong console
      if (error.response) {
        const backendError = error.response.data;

        return {
          success: false,
          message: backendError.error || 'Đăng nhập thất bại',
          status: error.response.status
        };

      } else {
        return {
          success: false,
          message: 'Có lỗi xảy ra khi đăng nhập',
          originalError: error.message
        };
      }
    }
  },

  // Đăng ký người dùng mới
  register: async (user_name, email, password) => {
    try {
      const response = await api.post('/users/register', { user_name, email, password });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || error.response?.data?.message || 'Đăng ký thất bại'
      };
    }
  },

  // Lấy danh sách tất cả người dùng (dành cho admin)
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Không thể lấy danh sách người dùng'
      };
    }
  },

  // Quản lý token xác thực
  setToken: (token) => {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  // Lấy token xác thực
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Xóa token xác thực
  removeToken: () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  },

  // Kiểm tra người dùng đã đăng nhập hay chưa
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Cập nhật vai trò người dùng
  updateUserRole: async (userId, data) => {
    try {
      const response = await api.put(`/users/${userId}`, data);
      return {
        success: true,
        data: response.data,
        message: response.data?.message || 'Cập nhật thành công'
      };
    } catch (error) {
      throw error;
    }
  },

  // Xóa người dùng
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return {
        data: response.data,
        success: true,
        message: 'Xóa tài khoản thành công'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Không thể xóa người dùng',
        status: error.response?.status
      };
    }
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async () => {
    try {
      // Lấy user từ localStorage
      const userStr = localStorage.getItem('user');

      // Parse user object từ localStorage
      const user = JSON.parse(userStr);

      // Lấy userId từ user object (kiểm tra nhiều trường có thể có)
      const userId = user.user_id

      if (!userId) {
        return {
          success: false,
          message: 'Không tìm thấy ID người dùng'
        };
      }

      // Gọi API với userId
      const response = await api.get(`/users/findOne?user_id=${userId}`);
      return response.data;

    } catch (error) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data?.message || 'Không thể lấy thông tin người dùng',
          status: error.response.status
        };
      }

      return {
        success: false,
        message: error.message || 'Không thể lấy thông tin người dùng'
      };
    }
  },

  // Cập nhật hồ sơ người dùng
  updateProfile: async (userId, data) => {
    try {
      const response = await api.put(`/users/${userId}`, data);

      return {
        success: true,
        user: response.data,
        message: 'Cập nhật hồ sơ thành công'
      };

    } catch (error) {
      // Kiểm tra lỗi email đã tồn tại
      if (error.response?.status === 400 || error.response?.status === 409) {
        const errorData = error.response?.data;

        // Kiểm tra các trường hợp lỗi email
        if (errorData?.error === 'Validation error') {
          return {
            success: false,
            message: 'Email đã được sử dụng. Vui lòng chọn email khác.'
          };
        }

        if (errorData?.message?.includes('email') ||
          errorData?.message?.includes('Email') ||
          errorData?.error?.includes('email')) {
          return {
            success: false,
            message: 'Email đã được sử dụng. Vui lòng chọn email khác.'
          };
        }

        if (errorData?.message) {
          return {
            success: false,
            message: errorData.message
          };
        }
      }

      // Lỗi khác
      return {
        success: false,
        message: 'Không thể cập nhật hồ sơ. Vui lòng thử lại sau.'
      };
    }
  },
};

// Khởi tạo header Authorization nếu đã có token lưu trong localStorage
const token = authService.getToken();
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default authService;