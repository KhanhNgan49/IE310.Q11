import React, { useState, useEffect, useRef } from 'react';
import LocationSearch from '../LocationSearch/LocationSearch';
import './MapPicker.css';

const MapPicker = ({ onLocationSelect, initialLocation, height = '400px' }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || {
    lat: 21.0278,
    lng: 105.8342,
    address: 'Hà Nội, Vietnam'
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const mapRef = useRef(null);

  // Giả lập tích hợp Leaflet/Google Maps
  const handleMapClick = (e) => {
    if (!isSelecting) return;
    
    const newLocation = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      address: `Vị trí đã chọn: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`
    };
    
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation);
    setIsSelecting(false);
  };

  const startSelection = () => {
    setIsSelecting(true);
  };

  const handleLocationSearchSelect = (location) => {
    const newLocation = {
      lat: location.lat,
      lng: location.lng,
      address: location.address,
      name: location.name
    };
    
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation);
  };

  const handleCurrentLocation = () => {
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
          setSelectedLocation(location);
          onLocationSelect(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Không thể lấy vị trí hiện tại. Vui lòng kiểm tra quyền truy cập vị trí.');
        }
      );
    } else {
      alert('Trình duyệt không hỗ trợ lấy vị trí.');
    }
  };

  const clearSelection = () => {
    setSelectedLocation(null);
    setIsSelecting(false);
  };

  return (
    <div className="map-picker">
      {/* Search và Controls - ĐÃ SỬA VỊ TRÍ */}
      <div className="map-controls-top">
        <div className="search-section">
          <LocationSearch
            onLocationSelect={handleLocationSearchSelect}
            placeholder="Tìm kiếm địa chỉ hoặc tên cơ sở y tế..."
            className="compact"
            showCurrentLocation={false}
          />
        </div>
        
        <div className="control-buttons">
          <button 
            className={`btn btn-sm ${isSelecting ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={startSelection}
            type="button"
          >
            <i className="bi bi-geo-alt me-1"></i>
            {isSelecting ? 'Đang chọn...' : 'Chọn trên bản đồ'}
          </button>
          
          <button 
            className="btn btn-sm btn-outline-success"
            onClick={handleCurrentLocation}
            type="button"
          >
            <i className="bi bi-crosshair me-1"></i>
            Vị trí của tôi
          </button>

          {selectedLocation && (
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={clearSelection}
              type="button"
            >
              <i className="bi bi-x me-1"></i>
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="map-container"
        style={{ height }}
        onClick={handleMapClick}
      >
        <div className="map-placeholder">
          <div className="placeholder-content">
            <i className="bi bi-map"></i>
            <h5>Bản Đồ Chọn Vị Trí</h5>
            <p>
              {isSelecting 
                ? 'Nhấp vào bản đồ để chọn vị trí' 
                : 'Sử dụng thanh tìm kiếm hoặc nút "Chọn trên bản đồ"'
              }
            </p>
            
            {selectedLocation && (
              <div className="selected-location-info">
                <div className="location-coordinates">
                  <strong>Tọa độ:</strong> {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </div>
                <div className="location-address">
                  <strong>Địa chỉ:</strong> {selectedLocation.address}
                </div>
              </div>
            )}
            
            {/* Marker cho vị trí đã chọn */}
            {selectedLocation && !isSelecting && (
              <div 
                className="location-marker"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <i className="bi bi-geo-alt-fill marker-icon"></i>
              </div>
            )}
            
            {/* Crosshair khi đang chọn */}
            {isSelecting && (
              <div className="selection-crosshair">
                <div className="crosshair"></div>
                <div className="instruction">Nhấp để chọn vị trí</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Details */}
      {selectedLocation && (
        <div className="location-details">
          <h6>Thông Tin Vị Trí Đã Chọn</h6>
          <div className="details-grid">
            <div className="detail-item">
              <label>Vĩ độ:</label>
              <span>{selectedLocation.lat.toFixed(6)}</span>
            </div>
            <div className="detail-item">
              <label>Kinh độ:</label>
              <span>{selectedLocation.lng.toFixed(6)}</span>
            </div>
            <div className="detail-item full-width">
              <label>Địa chỉ:</label>
              <span>{selectedLocation.address}</span>
            </div>
            {selectedLocation.name && (
              <div className="detail-item full-width">
                <label>Tên địa điểm:</label>
                <span>{selectedLocation.name}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPicker;