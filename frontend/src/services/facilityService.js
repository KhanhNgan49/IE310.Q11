import { api } from './axiosServices';

const facilityService = {
  // Lấy toàn bộ cơ sở y tế
  getAllFacilities: async () => {
    try {
      const response = await api.get('/medical-facilities');
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Không thể lấy danh sách cơ sở y tế'
      };
    }
  },

  // Lấy cơ sở y tế theo ID
  getFacilityById: async (id) => {
    try {
      const response = await api.get(`/medical-facilities/${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Không thể lấy thông tin cơ sở y tế'
      };
    }
  },

  // Tạo cơ sở y tế mới
  createFacility: async (data) => {
    try {
      const response = await api.post('/medical-facilities', data);
      return response.data;
    } catch (error) {
      const backendError = error.response?.data;
      return {
        success: false,
        message: backendError?.error || backendError?.message || 'Thêm cơ sở y tế thất bại'
      };
    }
  },

  // Cập nhật nhà thuốc
  updateFacility: async (id, data) => {
    try {
      const response = await api.put(`/medical-facilities/${id}`, data);
      return response.data;
    } catch (error) {
      const backendError = error.response?.data;
      return {
        success: false,
        message: backendError?.error || backendError?.message || 'Cập nhật cơ sở y tế thất bại'
      };
    }
  },

  // Xóa nhà thuốc
  deleteFacility: async (id) => {
    try {
      const response = await api.delete(`/medical-facilities/${id}`); // Đã sửa endpoint
      // Kiểm tra nếu response có success = false
      if (response.data.success === false) {
        return {
          success: false,
          message: response.data.message || 'Xóa cơ sở y tế thất bại'
        };
      }
      return response.data;
    } catch (error) {
      const backendError = error.response?.data;
      return {
        success: false,
        message: backendError?.error || backendError?.message || 'Xóa cơ sở y tế thất bại'
      };
    }
  },

  // Tìm kiếm cơ sở y tế theo từ khóa
  searchFacilities: async (query) => {
    try {
      const response = await api.get('/medical-facilities/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.log('Search medical facilities error:', error.message);
      return {
        success: false,
        message: 'Không thể tìm kiếm cơ sở y tế'
      };
    }
  }
};

export default facilityService;
