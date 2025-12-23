import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái thông tin user
  const [loading, setLoading] = useState(true); // Trạng thái loading khi kiểm tra xác thực

  // Kiểm tra xác thực khi component mount
  useEffect(() => {
    // Kiểm tra xem user đã đăng nhập chưa
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');

      if (userData && token) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    // Gọi hàm kiểm tra xác thực
    checkAuth();

    // Lắng nghe sự kiện storage để đồng bộ giữa các tab
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Hàm đăng nhập
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Hàm cập nhật thông tin user
  const updateUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Hàm làm mới token
  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Lấy token hiện tại
      if (!token) return null;

      // Gọi API làm mới token
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        return data.token;
      }
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  // Hàm kiểm tra user có role nhất định không
  const hasRole = (requiredRoles) => {
    if (!user || !user.role) return false;

    // Nếu requiredRoles là string, chuyển thành array
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // Kiểm tra xem user có role nào trong requiredRoles không
    return roles.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    refreshToken,
    hasRole,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};