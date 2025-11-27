import React, { useState } from 'react';
import './MedicalFacilityCard.css';
import ReviewsSection from '../ReviewsSection/ReviewsSection';

const MedicalFacilityCard = ({ facility, onSelect, onBook, isSelected }) => {
  const [showReviews, setShowReviews] = useState(false);

  const getPriceRangeLabel = (priceRange) => {
    switch (priceRange) {
      case 'low': return 'Giá thấp';
      case 'medium': return 'Giá trung bình';
      case 'high': return 'Giá cao';
      default: return 'Liên hệ';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'hospital': return 'Bệnh viện';
      case 'clinic': return 'Phòng khám';
      case 'medical_center': return 'Trung tâm y tế';
      default: return 'Cơ sở y tế';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hospital': return 'bi-hospital';
      case 'clinic': return 'bi-plus-circle';
      case 'medical_center': return 'bi-building';
      default: return 'bi-heart-pulse';
    }
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    onBook(facility);
  };

  const handleReviewsClick = (e) => {
    e.stopPropagation();
    setShowReviews(!showReviews);
  };

  return (
    <div 
      className={`medical-facility-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(facility)}
    >
      {/* Header */}
      <div className="card-header">
        <div className="facility-type">
          <i className={`bi ${getTypeIcon(facility.type)} me-1`}></i>
          {getTypeLabel(facility.type)}
        </div>
        <div className="price-range">
          <span className={`price-badge ${facility.priceRange}`}>
            {getPriceRangeLabel(facility.priceRange)}
          </span>
        </div>
      </div>

      {/* Basic Info */}
      <div className="card-body">
        <h5 className="facility-name">{facility.name}</h5>
        <p className="facility-address">
          <i className="bi bi-geo-alt me-1"></i>
          {facility.address}
        </p>
        <p className="facility-phone">
          <i className="bi bi-telephone me-1"></i>
          {facility.phone}
        </p>

        {/* Rating and Distance */}
        <div className="facility-meta">
          <div className="rating">
            <span className="stars">
              {'★'.repeat(Math.floor(facility.rating))}
              {'☆'.repeat(5 - Math.floor(facility.rating))}
            </span>
            <span className="rating-value">{facility.rating}</span>
            <span className="review-count">({facility.reviewCount} đánh giá)</span>
          </div>
          <div className="distance-info">
            <i className="bi bi-clock me-1"></i>
            {facility.waitTime} • {facility.distance}
          </div>
        </div>

        {/* Specialties */}
        <div className="specialties">
          <label>Chuyên khoa:</label>
          <div className="specialty-tags">
            {facility.specialties.slice(0, 3).map((specialty, index) => (
              <span key={index} className="specialty-tag">
                {specialty}
              </span>
            ))}
            {facility.specialties.length > 3 && (
              <span className="specialty-tag more">
                +{facility.specialties.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Insurance */}
        <div className="insurance">
          <label>Bảo hiểm:</label>
          <div className="insurance-tags">
            {facility.insurance.slice(0, 2).map((ins, index) => (
              <span key={index} className="insurance-tag">
                {ins}
              </span>
            ))}
            {facility.insurance.length > 2 && (
              <span className="insurance-tag more">
                +{facility.insurance.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Working Hours */}
        <div className="working-hours">
          <label>
            <i className="bi bi-clock me-1"></i>
            Giờ làm việc:
          </label>
          <div className="hours-list">
            <div className="hour-item">
              <span>Sáng:</span>
              <span>{facility.workingHours.morning}</span>
            </div>
            <div className="hour-item">
              <span>Chiều:</span>
              <span>{facility.workingHours.afternoon}</span>
            </div>
            {facility.workingHours.emergency !== 'Không' && (
              <div className="hour-item emergency">
                <span>Cấp cứu:</span>
                <span>{facility.workingHours.emergency}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="card-actions">
        <button 
          className="btn btn-primary btn-sm"
          onClick={handleBookClick}
        >
          <i className="bi bi-calendar-plus me-1"></i>
          Đặt lịch
        </button>
        <button 
          className="btn btn-outline-secondary btn-sm"
          onClick={handleReviewsClick}
        >
          <i className="bi bi-chat-text me-1"></i>
          Đánh giá
        </button>
        <button className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-share me-1"></i>
          Chia sẻ
        </button>
      </div>

      {/* Reviews Section */}
      {showReviews && (
        <div className="reviews-section">
          <ReviewsSection facilityId={facility.id} />
        </div>
      )}
    </div>
  );
};

export default MedicalFacilityCard;