import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const authService = {
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
        // Server trả về lỗi (4xx, 5xx)
        const backendError = error.response.data;
        console.log('Login error from server:', backendError.error || backendError.message);
        
        // Trả về object lỗi thay vì throw
        return {
          success: false,
          message: backendError.error || 'Đăng nhập thất bại',
          status: error.response.status
        };
        
      } else if (error.request) {
        // Không nhận được response từ server
        console.log('Network error - No response received:', error.message);
        return {
          success: false,
          message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.',
          originalError: 'Network error'
        };
      } else {
        // Lỗi khác
        console.log('Login error:', error.message);
        return {
          success: false,
          message: 'Có lỗi xảy ra khi đăng nhập',
          originalError: error.message
        };
      }
    }
  },

  setToken: (token) => {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
};

const token = authService.getToken();
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { api };
export default authService;