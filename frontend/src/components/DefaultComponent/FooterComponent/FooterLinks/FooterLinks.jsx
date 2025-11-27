import React from 'react';
import './FooterLinks.css';

const FooterLinks = ({ title, links }) => {
  return (
    <div className="footer-links">
      <h6 className="footer-links-title">{title}</h6>
      <ul className="footer-links-list">
        {links.map((link, index) => (
          <li key={index} className="footer-links-item">
            <a href={link.url} className="footer-link">
              <i className="fas fa-chevron-right me-2"></i>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;