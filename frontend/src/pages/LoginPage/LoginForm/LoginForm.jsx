import React, { useState } from 'react';
import authService from '../../../services/authService';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors khi người dùng bắt đầu gõ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoginSuccess(false);
  
  // Validate form phía frontend
  const newErrors = {};
  
  if (!formData.email) {
    newErrors.email = 'Vui lòng nhập email';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Email không hợp lệ. Ví dụ: name@example.com';
  }
  
  if (!formData.password) {
    newErrors.password = 'Vui lòng nhập mật khẩu';
  } else if (formData.password.length < 6) {
    newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  }
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  setIsLoading(true);
  
  try {
    // Gọi API login - giờ không cần try-catch nữa vì authService không throw error
    const result = await authService.login(formData.email, formData.password);
    
    console.log('Login result:', result); // Chỉ log thông tin
    
    if (result.message === 'Login successfully') {
      // Lưu token
      authService.setToken(result.token);
      
      // Lưu thông tin user
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Hiển thị thông báo thành công
      setLoginSuccess(true);
      
      // Tự động chuyển hướng sau 1.5 giây
      setTimeout(() => {
        // Kiểm tra role để chuyển hướng phù hợp
        const redirectPath = result.user.role === 'admin' ? '/admin' : '/dashboard';  //admin thì qua dashboard còn user qua trang chủ
        window.location.href = redirectPath;
      }, 1500);
      
    } else {
      // Xử lý lỗi từ backend
      console.log('Login failed:', result.message);
      
      // Highlight trường bị lỗi nếu có thể xác định
      if (result.message?.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: 'Email không đúng' }));
      }
      if (result.message?.toLowerCase().includes('password') || 
          result.message?.toLowerCase().includes('mật khẩu')) {
        setErrors(prev => ({ ...prev, password: 'Mật khẩu không đúng' }));
      }
    }
  } catch (error) {
    // Bây giờ catch này sẽ không bao giờ chạy trừ khi có lỗi không mong muốn
    console.log('Unexpected error in handleSubmit:', error);
  } finally {
    setIsLoading(false);
  }
};

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Xử lý quên mật khẩu
    window.location.href = '/forgot-password';
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        {/* Form Header */}
        <div className="login-form-header text-center mb-4">
          <div className="login-form-logo mb-3">
            <i className="bi bi-hospital fs-1 text-primary"></i>
          </div>
          <h2 className="login-form-title">Đăng Nhập Hệ Thống</h2>
          <p className="login-form-subtitle">
            Truy cập vào Bản đồ Y tế Thông minh
          </p>
        </div>

        {/* Hiển thị thông báo thành công */}
        {loginSuccess && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            Đăng nhập thành công! Đang chuyển hướng...
            <div className="progress mt-2" style={{height: '3px'}}>
              <div 
                className="progress-bar bg-success" 
                role="progressbar" 
                style={{width: '100%'}}
                aria-valuenow="100" 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        )}


        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope me-2"></i>
              Địa chỉ Email
            </label>
            <input
              type="email"
              className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập địa chỉ email"
              required
              autoComplete="email"
              disabled={isLoading}
            />
            {errors.email && (
              <div className="invalid-feedback d-block">
                <i className="bi bi-x-circle me-1"></i>
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-lock me-2"></i>
              Mật khẩu
            </label>
            <input
              type="password"
              className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
            {errors.password && (
              <div className="invalid-feedback d-block">
                <i className="bi bi-x-circle me-1"></i>
                {errors.password}
              </div>
            )}
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
                disabled={isLoading}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <button 
              type="button"
              className="btn btn-link forgot-password-link p-0"
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              Quên mật khẩu?
            </button>
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

        

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="register-text">
            Chưa có tài khoản? 
            <a href="/register" className="register-link ms-1">
              Đăng ký ngay
            </a>
          </p>
        </div>

        {/* Thông tin hỗ trợ */}
        <div className="support-info text-center mt-3">
          <small className="text-muted">
            <i className="bi bi-question-circle me-1"></i>
            Cần hỗ trợ? Liên hệ: 
            <a href="mailto:support@yte.vn" className="ms-1">support@yte.vn</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;