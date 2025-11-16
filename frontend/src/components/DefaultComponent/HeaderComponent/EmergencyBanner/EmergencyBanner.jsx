import React, { useState } from 'react';
import './EmergencyBanner.css';

const EmergencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="emergency-banner alert alert-warning alert-dismissible fade show mb-0" role="alert">
      <div className="container-fluid text-center">
        <strong>
          <i className="fas fa-exclamation-triangle me-2"></i>
          CẢNH BÁO DỊCH BỆNH:
        </strong> 
        <span className="ms-2">Khu vực Hà Nội đang có diễn biến phức tạp về dịch sốt xuất huyết</span>
        <button 
          type="button" 
          className="btn-close" 
          onClick={handleClose}
        ></button>
      </div>
    </div>
  );
};

export default EmergencyBanner;