import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      icon: 'bi bi-geo-alt',
      title: 'Tìm Cơ sở Y Tế',
      description: 'Tìm kiếm bệnh viện, phòng khám gần bạn nhất với đầy đủ thông tin chi tiết.',
      features: ['Định vị GPS', 'Giờ làm việc', 'Chuyên khoa', 'Đánh giá'],
      path: '/medical-facility'
    },
    {
      icon: 'bi bi-virus',
      title: 'Theo Dõi Dịch Bệnh',
      description: 'Cập nhật thông tin các vùng dịch và cảnh báo sức khỏe cộng đồng.',
      features: ['Bản đồ dịch tễ', 'Cảnh báo khu vực', 'Số liệu thống kê', 'Khuyến cáo'],
      path: '/outbreaks'
    },
    {
      icon: 'bi bi-clock',
      title: 'Đặt Lịch Khám',
      description: 'Đặt lịch khám bệnh trực tuyến với các cơ sở y tế hợp tác.',
      features: ['Đặt lịch online', 'Nhắc lịch SMS', 'Lịch sử khám', 'Hồ sơ điện tử'],
      path: '/onlinebooking-function'
    },
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
  }

  return (
    <section className="services-section section section-gray">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Dịch Vụ Y Tế Trực Tuyến</h2>
              <p className="section-subtitle">
                Khám phá các dịch vụ y tế số tiện ích dành cho cộng đồng
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h5 className="service-title">{service.title}</h5>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <i className="bi bi-check-circle-fill"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleNavigate(service.path)}
                >
                  Khám phá ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;