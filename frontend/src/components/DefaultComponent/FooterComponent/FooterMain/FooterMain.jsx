import React from 'react';
import './FooterMain.css';
import FooterLinks from '../FooterLinks/FooterLinks';
import FooterContact from '../FooterContact/FooterContact';
import FooterSocial from '../FooterSocial/FooterSocial';
import LogoImage from '../../../../assets/Logo/LogoImage.png';

const FooterMain = () => {
  return (
    <div className="footer-main py-5">
      <div className="container">
        <div className="row">
          {/* Column 1: Logo và mô tả */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-brand mb-3">
              <div className="footer-logo me-3">
                <img 
                  src={LogoImage} 
                  alt="Bản đồ Y tế Quốc gia" 
                  className="footer-logo-image"
                />
              </div>
              <div>
                <h5 className="brand-title">BẢN ĐỒ Y TẾ QUỐC GIA</h5>
                <p className="brand-subtitle">National Health Map</p>
              </div>
            </div>
            <p className="footer-description">
              Hệ thống cung cấp thông tin y tế toàn diện, giúp người dân dễ dàng 
              tìm kiếm các cơ sở y tế và theo dõi tình hình dịch bệnh trên toàn quốc.
            </p>
            
          </div>

          {/* Column 2: Liên kết nhanh */}
          <div className="col-lg-2 col-md-6 mb-4">
            <FooterLinks 
              title="Liên Kết Nhanh"
              links={[
                { name: 'Trang Chủ', url: '/' },
                { name: 'Bản Đồ', url: '/map' },
                { name: 'Bệnh Viện', url: '/hospitals' },
                { name: 'Vùng Dịch', url: '/outbreak-areas' },
                { name: 'Tin Tức Y Tế', url: '/news' }
              ]}
            />
          </div>

          {/* Column 3: Hỗ trợ */}
          <div className="col-lg-2 col-md-6 mb-4">
            <FooterLinks 
              title="Hỗ Trợ"
              links={[
                { name: 'Hướng Dẫn Sử Dụng', url: '/help' },
                { name: 'Câu Hỏi Thường Gặp', url: '/faq' },
                { name: 'Liên Hệ', url: '/contact' },
                { name: 'Báo Lỗi', url: '/report' },
                { name: 'Đóng Góp Ý Kiến', url: '/feedback' }
              ]}
            />
          </div>

          {/* Column 4: Liên hệ & Mạng xã hội */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FooterContact />
            <FooterSocial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;