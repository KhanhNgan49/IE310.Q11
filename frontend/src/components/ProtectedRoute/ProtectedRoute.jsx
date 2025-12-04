import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = '/unauthorized',
  fallback = null
}) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  if (loading) {
    // Hiển thị loading spinner hoặc component loading
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, chuyển hướng đến trang login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Nếu có yêu cầu role cụ thể
  if (requiredRole && !hasRole(requiredRole)) {
    // Nếu không có quyền, chuyển hướng hoặc hiển thị fallback
    if (fallback) {
      return fallback;
    }
    
    // Mặc định chuyển hướng về trang chủ
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;