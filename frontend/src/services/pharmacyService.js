import { api } from './axiosServices';

const pharmacyService = {
  // Lấy toàn bộ nhà thuốc
  getAllPharmacies: async () => {
    try {
      const response = await api.get('/pharmacies');
      return response.data;
    } catch (error) {
      console.log('Get pharmacies error:', error.message);
      return {
        success: false,
        message: 'Không thể lấy danh sách nhà thuốc'
      };
    }
  },

  // Lấy nhà thuốc theo ID
  getPharmacyById: async (id) => {
    try {
      const response = await api.get(`/pharmacies/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Get pharmacy ${id} error:`, error.message);
      return {
        success: false,
        message: 'Không thể lấy thông tin nhà thuốc'
      };
    }
  },

  // Tạo nhà thuốc mới
  createPharmacy: async (data) => {
    try {
      const response = await api.post('/pharmacies', data);
      return response.data;
    } catch (error) {
      const backendError = error.response?.data;
      return {
        success: false,
        message: backendError?.error || backendError?.message || 'Thêm nhà thuốc thất bại'
      };
    }
  },

  // Cập nhật nhà thuốc
  updatePharmacy: async (id, data) => {
    try {
      const response = await api.put(`/pharmacies/${id}`, data);
      return response.data;
    } catch (error) {
      const backendError = error.response?.data;
      return {
        success: false,
        message: backendError?.error || backendError?.message || 'Cập nhật nhà thuốc thất bại'
      };
    }
  },

  // Xóa nhà thuốc
  deletePharmacy: async (id) => {
    try {
      const response = await api.delete(`/pharmacies/${id}`); // Đã sửa endpoint
      // Kiểm tra nếu response có success = false
      if (response.data.success === false) {
        return {
          success: false,
          message: response.data.message || 'Xóa nhà thuốc thất bại'
        };
      }
      return response.data;
    } catch (error) {
      const backendError = error.response?.data;
      return {
        success: false,
        message: backendError?.error || backendError?.message || 'Xóa nhà thuốc thất bại'
      };
    }
  },

  searchPharmacies: async (query) => {
    try {
      const response = await api.get('/pharmacies/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.log('Search pharmacies error:', error.message);
      return {
        success: false,
        message: 'Không thể tìm kiếm nhà thuốc'
      };
    }
  }
};

export default pharmacyService;
