import React from 'react';
import './Logo.css';
import LogoImage from '../../../../assets/Logo/LogoImage.png';

const Logo = () => {
  return (
    <a className="navbar-brand d-flex align-items-center" href="/">
      <div className="header-logo me-2">
        <img 
          src={LogoImage} 
          alt="Bản đồ Y tế Quốc gia" 
          className="logo-image"
        />
      </div>
      <div className="brand-text">
        <span className="brand-title">BẢN ĐỒ Y TẾ QUỐC GIA</span>
        <small className="brand-subtitle">National Health Map</small>
      </div>
    </a>
  );
};

export default Logo;