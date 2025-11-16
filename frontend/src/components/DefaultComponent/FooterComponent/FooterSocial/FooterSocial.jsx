import React from 'react';
import './FooterSocial.css';

const FooterSocial = () => {
  const socialLinks = [
    {
      icon: 'bi bi-facebook',
      name: 'Facebook',
      url: '#',
      color: '#3b5998'
    },
    {
      icon: 'bi bi-twitter-x',
      name: 'Twitter',
      url: '#',
      color: '#3b5998'
    },
    {
      icon: 'bi bi-youtube',
      name: 'YouTube',
      url: '#',
      color: '#3b5998'
    },
    {
      icon: 'bi bi-linkedin',
      name: 'LinkedIn',
      url: '#',
      color: '#3b5998'
    },
    {
      icon: 'bi bi-telegram',
      name: 'Telegram',
      url: '#',
      color: '#3b5998'
    },
    {
      icon: 'bi bi-instagram',
      name: 'Instagram',
      url: '#',
      color: '#3b5998'
    }
  ];

  return (
    <div className="footer-social">
      <h6 className="footer-social-title">Kết Nối Với Chúng Tôi</h6>
      <div className="footer-social-links">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            className="footer-social-link"
            title={social.name}
            style={{ '--social-color': social.color }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={social.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;