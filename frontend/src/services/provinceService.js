import { api } from "./axiosServices";

const provinceService = {
  // Tìm kiếm tỉnh/thành phố theo từ khóa
  searchProvinces: async (data) => {
    try {   
        const response = await api.get(`/provinces/search/`, {
          params: {
            q: data 
          }
        });
        return response.data;
    } catch (error) {
      return {
        success: false,
        message: "Không thể lấy thông tin tỉnh/thành phố",
      };
    }  
  },

  // Lấy toàn bộ tỉnh/thành phố
  getAllProvinces: async () => {
    try {   
      const response = await api.get(`/provinces/`);
      return response.data || [];
    } catch (error) {
      return [];
    }  
  },  
};
export default provinceService;