import { api } from './axiosServices';

const userService = {
    // Lấy toàn bộ người dùng
    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.log('Get users error:', error.message);
            return {
                success: false,
                message: 'Không thể lấy danh sách người dùng'
            };
        }
    },
};

export default userService;
