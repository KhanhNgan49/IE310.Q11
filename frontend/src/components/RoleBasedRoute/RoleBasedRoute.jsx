import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RoleBasedRoute = ({ 
  children, 
  allowedRoles = [], 
  fallback = null,
  redirectTo = '/'
}) => {
  const { hasRole, loading } = useAuth(); // Sử dụng context xác thực

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Nếu không có role nào được chỉ định, cho phép tất cả
  if (allowedRoles.length === 0) {
    return children;
  }

  // Kiểm tra xem user có role được phép không
  const isAllowed = hasRole(allowedRoles);

  if (!isAllowed) {
    if (fallback) {
      return fallback;
    }
    
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RoleBasedRoute;