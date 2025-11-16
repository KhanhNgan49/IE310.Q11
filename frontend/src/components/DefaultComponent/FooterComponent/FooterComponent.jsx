import React from 'react';
import './FooterStyle.css';
import FooterMain from './FooterMain/FooterMain';
import FooterBottom from './FooterBottom/FooterBottom';

const FooterComponent = () => {
  return (
    <footer className="health-map-footer">
      {/* Phần chính của footer */}
      <FooterMain />
      
      {/* Phần bottom copyright */}
      <FooterBottom />
    </footer>
  );
};

export default FooterComponent;