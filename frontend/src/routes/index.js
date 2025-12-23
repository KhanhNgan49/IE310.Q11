import React from "react"
import Home from "../pages/HomePage/HomePage"
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import RoleBasedRoute from "../components/RoleBasedRoute/RoleBasedRoute"

export const routes = [{
        path: '/', // Trang chủ
        page: Home,
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/login', // Trang đăng nhập
        page: React.lazy(() => import("../pages/LoginPage/LoginPage")),
        isShowHeader: false,
        isPublic: true
    },
    {
        path: '/register', // Trang đăng ký
        page: React.lazy(() => import("../pages/LoginPage/RegisterPage")),
        isShowHeader: false,
        isPublic: true
    },
    {
        path: '/dashboard', // Trang dashboard cho Admin
        page: React.lazy(() => import("../pages/UserDashboard/UserDashboard")),
        isShowHeader: false,
        isPublic: false,
        requiredRole: 'admin'
    },
    {
        path: '/map', // Trang bản đồ công cộng
        page: React.lazy(() => import("../pages/PublicMapPage/PublicMapPage")),
        isShowHeader: true,
        isShowFooter: false,
        isPublic: true
    },
    {
        path: '/pharmacy', // Trang danh sách nhà thuốc
        page: React.lazy(() => import("../pages/PharmacyPage/PharmacyPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/unauthorized', // Trang lỗi không có quyền truy cập
        page: React.lazy(() => import("../pages/UnauthorizedPage/UnauthorizedPage")),
        isShowHeader: false,
        isPublic: true
    },
    {
        path: '/symptom-results', // Trang kết quả tìm kiếm theo triệu chứng
        page: React.lazy(() => import("../pages/SymptomResultsPage/SymptomResultsPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/filtered-results', // Trang kết quả lọc nâng cao
        page: React.lazy(() => import("../pages/FilteredResultsPage/FilteredResultsPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/my-appointments', // Trang quản lý cuộc hẹn của người dùng
        page: React.lazy(() => import("../pages/MyAppointmentsPage/MyAppointmentsPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/symptom-function', // Trang tìm kiếm theo triệu chứng
        page: React.lazy(() => import("../pages/SymptomSearchPage/SymptomSearchPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/nearbyfacilities-function', // Trang tìm kiếm cơ sở y tế gần nhất
        page: React.lazy(() => import("../pages/NearbyFacilitiesPage/NearbyFacilitiesPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/onlinebooking-function', // Trang đặt lịch khám trực tuyến
        page: React.lazy(() => import("../pages/OnlineBookingPage/OnlineBookingPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/filtered-function', // Trang lọc nâng cao
        page: React.lazy(() => import("../pages/FiltersPage/FiltersPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/outbreaks', // Trang thông tin dịch bệnh
        page: React.lazy(() => import("../pages/OutbreakPage/OutbreakPage")),
        isShowHeader: true,
        isPublic: true
    },
    {
        path: '/profile', // Trang hồ sơ người dùng
        page: React.lazy(() => import("../pages/ProfilePage/ProfilePage")),
        isShowHeader: true,
        isPublic: false,
    },
    {
        path: '/medical-facility', // Trang thông tin cơ sở y tế
        page: React.lazy(() => import("../pages/MedicalFacilityPage/MedicalFacilityPage")),
        isShowHeader: true,
        isPublic: true,
    }
]