import React, { useState } from 'react';
import './MapFilters.css';

const MapFilters = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const insuranceOptions = [
    'BHYT', 'Bảo Việt', 'Bảo Hiểm Nhân Thọ', 'MIC', 'Prudential', 'AIA'
  ];

  const specialtyOptions = [
    'Tất cả',
    'Tim mạch', 'Nội khoa', 'Ngoại khoa', 'Sản phụ khoa',
    'Nhi khoa', 'Da liễu', 'Răng hàm mặt', 'Mắt',
    'Tai mũi họng', 'Cơ xương khớp', 'Thần kinh', 'Tâm thần',
    'Ung bướu', 'Tiêu hóa', 'Hô hấp', 'Nội tiết'
  ];

  const priceRanges = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: 'low', label: 'Giá thấp (Dưới 500k)' },
    { value: 'medium', label: 'Giá trung bình (500k - 2tr)' },
    { value: 'high', label: 'Giá cao (Trên 2tr)' }
  ];

  const workingHoursOptions = [
    { value: 'all', label: 'Tất cả giờ' },
    { value: 'morning', label: 'Sáng (6h - 12h)' },
    { value: 'afternoon', label: 'Chiều (12h - 18h)' },
    { value: 'evening', label: 'Tối (18h - 22h)' },
    { value: '24/7', label: '24/7' }
  ];

  const handleInsuranceChange = (insurance) => {
    const newInsurance = filters.insurance.includes(insurance)
      ? filters.insurance.filter(item => item !== insurance)
      : [...filters.insurance, insurance];
    
    onFilterChange({
      ...filters,
      insurance: newInsurance
    });
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      insurance: [],
      priceRange: 'all',
      specialty: 'all',
      workingHours: 'all',
      rating: 0
    });
  };

  const hasActiveFilters = filters.insurance.length > 0 || 
    filters.priceRange !== 'all' || 
    filters.specialty !== 'all' || 
    filters.workingHours !== 'all' || 
    filters.rating > 0;

  return (
    <div className="map-filters">
      <div className="filters-header">
        <h6>
          <i className="bi bi-funnel me-2"></i>
          Bộ Lọc
        </h6>
        <div className="filter-actions">
          {hasActiveFilters && (
            <button 
              className="btn btn-link btn-sm clear-filters"
              onClick={clearAllFilters}
            >
              Xóa hết
            </button>
          )}
          <button 
            className="btn btn-link btn-sm toggle-filters"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
          </button>
        </div>
      </div>

      <div className={`filters-content ${isExpanded ? 'expanded' : ''}`}>
        {/* Rating Filter */}
        <div className="filter-group">
          <label className="filter-label">Đánh giá</label>
          <div className="rating-filter">
            {[4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                className={`rating-option ${filters.rating === rating ? 'active' : ''}`}
                onClick={() => handleFilterChange('rating', filters.rating === rating ? 0 : rating)}
              >
                <span className="stars">
                  {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </span>
                <span className="rating-text">từ {rating} sao</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <label className="filter-label">Mức giá</label>
          <div className="price-filter">
            {priceRanges.map(range => (
              <div key={range.value} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceRange"
                  id={`price-${range.value}`}
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                />
                <label className="form-check-label" htmlFor={`price-${range.value}`}>
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="filter-group">
          <label className="filter-label">Chuyên khoa</label>
          <select
            className="form-select form-select-sm"
            value={filters.specialty}
            onChange={(e) => handleFilterChange('specialty', e.target.value)}
          >
            {specialtyOptions.map(specialty => (
              <option key={specialty} value={specialty === 'Tất cả' ? 'all' : specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Working Hours Filter */}
        <div className="filter-group">
          <label className="filter-label">Giờ làm việc</label>
          <select
            className="form-select form-select-sm"
            value={filters.workingHours}
            onChange={(e) => handleFilterChange('workingHours', e.target.value)}
          >
            {workingHoursOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Insurance Filter */}
        <div className="filter-group">
          <label className="filter-label">Bảo hiểm được nhận</label>
          <div className="insurance-filter">
            {insuranceOptions.map(insurance => (
              <div key={insurance} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`insurance-${insurance}`}
                  checked={filters.insurance.includes(insurance)}
                  onChange={() => handleInsuranceChange(insurance)}
                />
                <label className="form-check-label" htmlFor={`insurance-${insurance}`}>
                  {insurance}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="active-filters">
          {filters.insurance.map(insurance => (
            <span key={insurance} className="filter-badge">
              {insurance}
              <button 
                onClick={() => handleInsuranceChange(insurance)}
                className="badge-remove"
              >
                ×
              </button>
            </span>
          ))}
          {filters.priceRange !== 'all' && (
            <span className="filter-badge">
              {priceRanges.find(r => r.value === filters.priceRange)?.label}
              <button 
                onClick={() => handleFilterChange('priceRange', 'all')}
                className="badge-remove"
              >
                ×
              </button>
            </span>
          )}
          {filters.specialty !== 'all' && (
            <span className="filter-badge">
              {filters.specialty}
              <button 
                onClick={() => handleFilterChange('specialty', 'all')}
                className="badge-remove"
              >
                ×
              </button>
            </span>
          )}
          {filters.workingHours !== 'all' && (
            <span className="filter-badge">
              {workingHoursOptions.find(w => w.value === filters.workingHours)?.label}
              <button 
                onClick={() => handleFilterChange('workingHours', 'all')}
                className="badge-remove"
              >
                ×
              </button>
            </span>
          )}
          {filters.rating > 0 && (
            <span className="filter-badge">
              Từ {filters.rating} sao
              <button 
                onClick={() => handleFilterChange('rating', 0)}
                className="badge-remove"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MapFilters;