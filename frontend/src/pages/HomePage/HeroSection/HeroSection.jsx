import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="hero-title">
                Bản Đồ Y Tế 
                <span className="text-primary"> Quốc Gia</span>
              </h1>
              <p className="hero-subtitle">
                Tra cứu thông tin các cơ sở y tế, theo dõi tình hình dịch bệnh 
                và tìm kiếm hỗ trợ y tế gần bạn nhất.
              </p>
              
              <div className="hero-features">
                <div className="feature-item">
                  <i className="bi bi-geo-alt-fill feature-icon"></i>
                  <span>Định vị bệnh viện gần nhất</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-virus feature-icon"></i>
                  <span>Theo dõi vùng dịch bệnh</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-clock-fill feature-icon"></i>
                  <span>Thông tin giờ làm việc</span>
                </div>
              </div>
              
              <div className="hero-actions">
                <a href="#map" className="btn btn-primary btn-lg me-3">
                  <i className="bi bi-map me-2"></i>
                  Xem Bản Đồ
                </a>
                <a href="#search" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-search me-2"></i>
                  Tìm Kiếm
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="hero-visual">
              <div className="map-preview">
                <i className="bi bi-geo-alt-fill preview-icon"></i>
                <div className="floating-hospital">
                  <i className="bi bi-hospital"></i>
                </div>
                <div className="floating-clinic">
                  <i className="bi bi-plus-circle"></i>
                </div>
                <div className="floating-outbreak">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;