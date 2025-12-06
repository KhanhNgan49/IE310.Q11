import { api } from './authService';

const userService = {
  /**
   * Lấy thông tin user hiện tại
   * @returns {Promise} Promise với thông tin user
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { 
        success: false, 
        message: 'Không thể lấy thông tin user' 
      };
    }
  },

  /**
   * Đăng ký user mới
   * @param {Object} userData - Thông tin đăng ký
   * @returns {Promise} Promise với kết quả đăng ký
   */
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { 
        success: false, 
        message: 'Không thể đăng ký' 
      };
    }
  },

  /**
   * Cập nhật thông tin user
   * @param {Object} userData - Thông tin cần cập nhật
   * @returns {Promise} Promise với kết quả cập nhật
   */
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { 
        success: false, 
        message: 'Không thể cập nhật thông tin' 
      };
    }
  }
};

export default userService;