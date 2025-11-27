import React, { useState, useEffect, useRef } from 'react';
import './LocationSearch.css';

const LocationSearch = ({ 
  onLocationSelect, 
  placeholder = "Tìm kiếm địa chỉ...",
  className = "",
  showCurrentLocation = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Sample location data - trong thực tế sẽ gọi API Geocoding
  const sampleLocations = [
    {
      id: 1,
      name: 'Bệnh viện Bạch Mai',
      address: '78 Giải Phóng, Đống Đa, Hà Nội',
      type: 'hospital',
      lat: 21.001,
      lng: 105.841
    },
    {
      id: 2,
      name: 'Bệnh viện Việt Đức',
      address: '40 Tràng Thi, Hoàn Kiếm, Hà Nội',
      type: 'hospital',
      lat: 21.028,
      lng: 105.851
    },
    {
      id: 3,
      name: 'Bệnh viện Nhi Trung ương',
      address: '18/879 La Thành, Đống Đa, Hà Nội',
      type: 'hospital',
      lat: 21.012,
      lng: 105.802
    },
    {
      id: 4,
      name: 'Bệnh viện Đa khoa Quốc tế',
      address: '152 Xã Đàn, Đống Đa, Hà Nội',
      type: 'hospital',
      lat: 21.015,
      lng: 105.836
    },
    {
      id: 5,
      name: 'Trung tâm Y tế Quận Hoàn Kiếm',
      address: '26 Lê Thái Tổ, Hoàn Kiếm, Hà Nội',
      type: 'medical_center',
      lat: 21.031,
      lng: 105.851
    }
  ];

  // Tìm kiếm địa chỉ
  useEffect(() => {
    const searchLocations = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      
      // Giả lập delay tìm kiếm
      setTimeout(() => {
        const filtered = sampleLocations.filter(location =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setSuggestions(filtered);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    };

    searchLocations();
  }, [searchTerm]);

  // Click outside để đóng suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    setSearchTerm(location.name);
    setShowSuggestions(false);
    onLocationSelect({
      lat: location.lat,
      lng: location.lng,
      address: location.address,
      name: location.name,
      type: location.type
    });
  };

  const handleCurrentLocation = () => {
    setIsLoading(true);
    
    // Giả lập lấy vị trí hiện tại
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Vị trí hiện tại của bạn',
            name: 'Vị trí hiện tại'
          };
          setSearchTerm('Vị trí hiện tại');
          setShowSuggestions(false);
          onLocationSelect(location);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Không thể lấy vị trí hiện tại. Vui lòng kiểm tra quyền truy cập vị trí.');
          setIsLoading(false);
        }
      );
    } else {
      alert('Trình duyệt không hỗ trợ lấy vị trí.');
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const getLocationIcon = (type) => {
    const icons = {
      hospital: 'bi bi-hospital',
      clinic: 'bi bi-plus-circle',
      medical_center: 'bi bi-building',
      pharmacy: 'bi bi-capsule',
      emergency: 'bi bi-ambulance'
    };
    return icons[type] || 'bi bi-geo-alt';
  };

  return (
    <div className={`location-search ${className}`} ref={searchRef}>
      <div className="search-input-container">
        <div className="search-icon">
          <i className="bi bi-search"></i>
        </div>
        
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        
        {searchTerm && (
          <button 
            className="clear-btn"
            onClick={clearSearch}
            type="button"
          >
            <i className="bi bi-x"></i>
          </button>
        )}
        
        {showCurrentLocation && (
          <button 
            className="current-location-btn"
            onClick={handleCurrentLocation}
            type="button"
            disabled={isLoading}
            title="Vị trí hiện tại"
          >
            <i className="bi bi-crosshair"></i>
          </button>
        )}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="search-loading">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>Đang tìm kiếm...</span>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map(location => (
            <div
              key={location.id}
              className="suggestion-item"
              onClick={() => handleLocationSelect(location)}
            >
              <div className="suggestion-icon">
                <i className={getLocationIcon(location.type)}></i>
              </div>
              <div className="suggestion-content">
                <div className="suggestion-name">{location.name}</div>
                <div className="suggestion-address">{location.address}</div>
              </div>
              <div className="suggestion-action">
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {showSuggestions && searchTerm && !isLoading && suggestions.length === 0 && (
        <div className="no-results">
          <i className="bi bi-search"></i>
          <div className="no-results-text">
            <div>Không tìm thấy kết quả cho "{searchTerm}"</div>
            <small>Thử tìm kiếm với từ khóa khác</small>
          </div>
        </div>
      )}

      {/* Recent Searches (có thể mở rộng) */}
      {showSuggestions && !searchTerm && (
        <div className="recent-searches">
          <div className="recent-header">
            <span>Tìm kiếm gần đây</span>
            <button className="btn btn-sm btn-link">Xóa</button>
          </div>
          <div className="recent-item">
            <i className="bi bi-clock"></i>
            <span>Bệnh viện Bạch Mai</span>
          </div>
          <div className="recent-item">
            <i className="bi bi-clock"></i>
            <span>Phòng khám Đa khoa</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;