import React from 'react';
import './FooterContact.css';

const FooterContact = () => {
  // Thông tin liên hệ
  const contactInfo = [
    {
      icon: 'bi bi-geo-alt-fill',
      text: 'Số 138A Giảng Võ, Ba Đình, Hà Nội',
      url: '#'
    },
    {
      icon: 'bi bi-telephone-fill',
      text: '1900 9095',
      url: 'tel:19009095'
    },
    {
      icon: 'bi bi-envelope-fill',
      text: 'hotro@bandoyte.gov.vn',
      url: 'mailto:hotro@bandoyte.gov.vn'
    },
    {
      icon: 'bi bi-clock-fill',
      text: '24/7 Hỗ trợ khẩn cấp',
      url: '#'
    }
  ];

  return (
    <div className="footer-contact">
      <h6 className="footer-contact-title">Thông Tin Liên Hệ</h6>
      <div className="footer-contact-list">
        {contactInfo.map((contact, index) => (
          <div key={index} className="footer-contact-item">
            <a href={contact.url} className="footer-contact-link">
              <i className={`${contact.icon} me-3`}></i>
              <span>{contact.text}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterContact;