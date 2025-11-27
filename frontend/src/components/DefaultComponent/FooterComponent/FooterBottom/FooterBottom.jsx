import React from 'react';
import './FooterBottom.css';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-bottom py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              &copy; {currentYear} Bản Đồ Y Tế Quốc Gia. 
              <span className="d-none d-sm-inline"> Tất cả quyền được bảo lưu.</span>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="footer-legal-links">
              <a href="/privacy" className="me-3">Chính Sách Bảo Mật</a>
              <a href="/terms" className="me-3">Điều Khoản Sử Dụng</a>
              <a href="/sitemap">Sơ Đồ Trang Web</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;