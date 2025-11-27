import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Giả lập xử lý đăng nhập
    setTimeout(() => {
      console.log('Login data:', formData);
      setIsLoading(false);
      // Xử lý đăng nhập thực tế ở đây
    }, 1500);
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        {/* Form Header */}
        <div className="login-form-header text-center mb-4">
          <h2 className="login-form-title">Đăng Nhập Hệ Thống</h2>
          <p className="login-form-subtitle">
            Truy cập vào trang quản trị Bản đồ Y tế Quốc gia
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <i className="bi bi-person me-2"></i>
              Tên đăng nhập
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-lock me-2"></i>
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a href="/forgot-password" className="forgot-password-link">
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Đang đăng nhập...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Đăng Nhập
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider my-4">
          <span>hoặc đăng nhập với</span>
        </div>

        {/* Social Login */}
        <div className="social-login-buttons">
          <button className="btn btn-outline-dark btn-social">
            <i className="bi bi-google"></i>
            Google
          </button>
          <button className="btn btn-outline-primary btn-social">
            <i className="bi bi-microsoft"></i>
            Microsoft
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="register-text">
            Chưa có tài khoản? 
            <a href="/register" className="register-link ms-1">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;