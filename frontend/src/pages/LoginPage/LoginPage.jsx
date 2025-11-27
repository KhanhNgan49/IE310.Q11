import React from 'react';
import './LoginPage.css';
import LoginHeader from './LoginHeader/LoginHeader';
import LoginForm from './LoginForm/LoginForm';
import LoginSidebar from './LoginSidebar/LoginSidebar';

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Header */}
      <LoginHeader />
      
      {/* Main Content */}
      <div className="login-container">
        <div className="container-fluid h-100">
          <div className="row h-100">
            {/* Login Form Section */}
            <div className="col-lg-8 col-md-12 login-form-section">
              <LoginForm />
            </div>
            
            {/* Sidebar/Info Section */}
            <div className="col-lg-4 col-md-12 login-sidebar-section d-none d-lg-block">
              <LoginSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;