import React, { useState, useEffect } from 'react';
import './PublicMapPage.css';
import MapSearch from './MapSearch/MapSearch';
import MapFilters from './MapFilters/MapFilters';
import MedicalFacilityCard from './MedicalFacilityCard/MedicalFacilityCard';
import BookingModal from './BookingModal/BookingModal';
import ReviewsSection from './ReviewsSection/ReviewsSection';
import EpidemicZones from './EpidemicZones/EpidemicZones';

const PublicMapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    insurance: [],
    priceRange: 'all',
    specialty: 'all',
    workingHours: 'all',
    rating: 0
  });
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [sortOption, setSortOption] = useState('distance');
  const [showEpidemicZones, setShowEpidemicZones] = useState(true);

  // Dữ liệu mẫu các cơ sở y tế
  const medicalFacilities = [
    {
      id: 1,
      name: 'Bệnh viện Bạch Mai',
      type: 'hospital',
      address: '78 Giải Phóng, Đống Đa, Hà Nội',
      phone: '024 3869 3731',
      lat: 21.001,
      lng: 105.841,
      specialties: ['Tim mạch', 'Nội tổng quát', 'Cấp cứu'],
      insurance: ['BHYT', 'Bảo Việt', 'Bảo Hiểm Nhân Thọ'],
      priceRange: 'medium',
      rating: 4.5,
      reviewCount: 1247,
      workingHours: {
        morning: '07:00 - 12:00',
        afternoon: '13:00 - 17:00',
        emergency: '24/7'
      },
      distance: '1.2 km',
      waitTime: '15 phút',
      services: ['Khám tổng quát', 'Cấp cứu', 'Xét nghiệm', 'Chẩn đoán hình ảnh'],
      images: ['/images/bachmai.jpg'],
      reviews: [
        {
          id: 1,
          patientName: 'Nguyễn Văn A',
          rating: 5,
          comment: 'Bác sĩ rất tận tâm, nhân viên thân thiện. Cơ sở vật chất hiện đại, sạch sẽ.',
          date: '2024-01-15',
          verified: true
        },
        {
          id: 2,
          patientName: 'Trần Thị B',
          rating: 4,
          comment: 'Khám nhanh, đúng hẹn. Tuy nhiên chờ kết quả hơi lâu.',
          date: '2024-01-10',
          verified: true
        }
      ]
    },
    {
      id: 2,
      name: 'Bệnh viện Việt Đức',
      type: 'hospital',
      address: '40 Tràng Thi, Hoàn Kiếm, Hà Nội',
      phone: '024 3825 3531',
      lat: 21.028,
      lng: 105.851,
      specialties: ['Ngoại khoa', 'Chấn thương', 'Phẫu thuật'],
      insurance: ['BHYT', 'Bảo Việt', 'MIC'],
      priceRange: 'high',
      rating: 4.7,
      reviewCount: 892,
      workingHours: {
        morning: '07:30 - 12:00',
        afternoon: '13:30 - 17:00',
        emergency: '24/7'
      },
      distance: '2.1 km',
      waitTime: '25 phút',
      services: ['Phẫu thuật', 'Cấp cứu', 'Vật lý trị liệu'],
      images: ['/images/vietduc.jpg'],
      reviews: [
        {
          id: 1,
          patientName: 'Lê Văn C',
          rating: 5,
          comment: 'Phẫu thuật thành công, bác sĩ giỏi và nhiệt tình.',
          date: '2024-01-12',
          verified: true
        }
      ]
    },
    {
      id: 3,
      name: 'Phòng khám Đa khoa Quốc tế',
      type: 'clinic',
      address: '152 Xã Đàn, Đống Đa, Hà Nội',
      phone: '024 3576 1999',
      lat: 21.015,
      lng: 105.836,
      specialties: ['Da liễu', 'Nha khoa', 'Sản phụ khoa'],
      insurance: ['Bảo Việt', 'Bảo Hiểm Nhân Thọ'],
      priceRange: 'high',
      rating: 4.3,
      reviewCount: 456,
      workingHours: {
        morning: '08:00 - 12:00',
        afternoon: '13:00 - 18:00',
        emergency: 'Không'
      },
      distance: '0.8 km',
      waitTime: '10 phút',
      services: ['Khám da liễu', 'Nha khoa thẩm mỹ', 'Siêu âm'],
      images: ['/images/pk-quocte.jpg'],
      reviews: []
    },
    {
      id: 4,
      name: 'Trung tâm Y tế Quận Hoàn Kiếm',
      type: 'medical_center',
      address: '26 Lê Thái Tổ, Hoàn Kiếm, Hà Nội',
      phone: '024 3825 2723',
      lat: 21.031,
      lng: 105.851,
      specialties: ['Y tế dự phòng', 'Tiêm chủng', 'Khám sức khỏe'],
      insurance: ['BHYT'],
      priceRange: 'low',
      rating: 4.0,
      reviewCount: 234,
      workingHours: {
        morning: '07:00 - 11:30',
        afternoon: '13:30 - 17:00',
        emergency: 'Không'
      },
      distance: '1.5 km',
      waitTime: '5 phút',
      services: ['Tiêm chủng', 'Khám sức khỏe định kỳ', 'Tư vấn sức khỏe'],
      images: ['/images/yt-hoankiem.jpg'],
      reviews: []
    }
  ];

    const mockEpidemicData = {
    lastUpdated: '2024-01-20 14:30:00',
    zones: [
      {
        id: 1,
        name: 'Quận Đống Đa',
        level: 'high',
        cases: 247,
        newCases: 15,
        riskDescription: 'Nguy cơ cao - Ổ dịch mới',
        affectedAreas: ['Phường Trung Tự', 'Phường Phương Liên', 'Phường Khâm Thiên'],
        diseases: ['COVID-19', 'Sốt xuất huyết'],
        coordinates: { lat: 21.018, lng: 105.832 },
        radius: 2.5,
        updateDate: '2024-01-20'
      },
      {
        id: 2,
        name: 'Quận Hoàn Kiếm',
        level: 'medium',
        cases: 128,
        newCases: 8,
        riskDescription: 'Nguy cơ trung bình',
        affectedAreas: ['Phường Hàng Bài', 'Phường Tràng Tiền'],
        diseases: ['COVID-19'],
        coordinates: { lat: 21.028, lng: 105.851 },
        radius: 1.8,
        updateDate: '2024-01-19'
      },
      {
        id: 3,
        name: 'Quận Hai Bà Trưng',
        level: 'low',
        cases: 45,
        newCases: 2,
        riskDescription: 'Nguy cơ thấp',
        affectedAreas: ['Phường Bạch Mai', 'Phường Minh Khai'],
        diseases: ['Sốt xuất huyết'],
        coordinates: { lat: 21.004, lng: 105.854 },
        radius: 2.0,
        updateDate: '2024-01-18'
      },
      {
        id: 4,
        name: 'Huyện Thanh Trì',
        level: 'high',
        cases: 189,
        newCases: 22,
        riskDescription: 'Nguy cơ cao - Cụm dịch công nghiệp',
        affectedAreas: ['Xã Tân Triều', 'Xã Tả Thanh Oai'],
        diseases: ['COVID-19', 'Tay chân miệng'],
        coordinates: { lat: 20.950, lng: 105.800 },
        radius: 3.5,
        updateDate: '2024-01-20'
      }
    ],
    statistics: {
      totalCases: 609,
      activeCases: 289,
      recovered: 315,
      deaths: 5,
      highRiskZones: 2,
      mediumRiskZones: 1,
      lowRiskZones: 1
    }
  };
  // Lấy vị trí người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Không thể lấy vị trí:', error);
          setUserLocation({
            lat: 21.0278,
            lng: 105.8342
          });
        }
      );
    }
  }, []);

  // Tìm cơ sở gần nhất
  useEffect(() => {
    if (userLocation) {
      const facilitiesWithDistance = medicalFacilities
        .map(facility => ({
          ...facility,
          distanceValue: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            facility.lat,
            facility.lng
          ),
          distance: `${calculateDistance(
            userLocation.lat,
            userLocation.lng,
            facility.lat,
            facility.lng
          ).toFixed(1)} km`
        }))
        .sort((a, b) => a.distanceValue - b.distanceValue)
        .slice(0, 3);
      
      setNearbyFacilities(facilitiesWithDistance);
    }
  }, [userLocation]);

  // Hàm tính khoảng cách
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Lọc và sắp xếp cơ sở y tế
  const filteredFacilities = medicalFacilities
    .filter(facility => {
      // Lọc theo search query
      const matchesSearch = !searchQuery || 
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
        facility.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));

      // Lọc theo bảo hiểm
      const matchesInsurance = filters.insurance.length === 0 || 
        filters.insurance.some(ins => facility.insurance.includes(ins));

      // Lọc theo khoảng giá
      const matchesPrice = filters.priceRange === 'all' || 
        facility.priceRange === filters.priceRange;

      // Lọc theo chuyên khoa
      const matchesSpecialty = filters.specialty === 'all' || 
        facility.specialties.includes(filters.specialty);

      // Lọc theo rating
      const matchesRating = facility.rating >= filters.rating;

      return matchesSearch && matchesInsurance && matchesPrice && matchesSpecialty && matchesRating;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_low':
          const priceOrder = { low: 0, medium: 1, high: 2 };
          return priceOrder[a.priceRange] - priceOrder[b.priceRange];
        case 'price_high':
          const priceOrderHigh = { low: 0, medium: 1, high: 2 };
          return priceOrderHigh[b.priceRange] - priceOrderHigh[a.priceRange];
        case 'distance':
        default:
          return a.distanceValue - b.distanceValue;
      }
    });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };



  const handleBookAppointment = (facility) => {
    setSelectedFacility(facility);
    setShowBookingModal(true);
  };

  const handleShowReviews = (facility) => {
    setSelectedFacility(facility);
    setShowReviewsModal(true);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking data:', bookingData);
    // Gửi API đặt lịch
    setShowBookingModal(false);
    alert('Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.');
  };

  const handleEmergency = () => {
    window.open('tel:115');
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          alert('Đã cập nhật vị trí của bạn!');
        },
        (error) => {
          alert('Không thể lấy vị trí. Vui lòng kiểm tra quyền truy cập vị trí.');
        }
      );
    }
  };
  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSelectedFacility(null); // Bỏ chọn facility khi chọn zone
  };

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
  };

  const toggleEpidemicZones = () => {
      setShowEpidemicZones(!showEpidemicZones);
    };

  
  return (
    <div className="public-map-page">
      

      <div className="map-container">
        {/* Sidebar */}
        <div className="map-sidebar">
          {/* Search Section */}
          <div className="search-section">
            <MapSearch onSearch={handleSearch} />
          </div>

          {/* Epidemic Zones */}
          {showEpidemicZones && (
            <EpidemicZones 
              onZoneSelect={handleZoneSelect}
              userLocation={userLocation}
            />
          )}

          {/* Nearby Facilities */}
          {nearbyFacilities.length > 0 && (
            <div className="nearby-section">
              <h5>
                <i className="bi bi-geo-alt-fill me-2"></i>
                Cơ sở gần bạn
              </h5>
              <div className="nearby-list">
                {nearbyFacilities.map(facility => (
                  <div 
                    key={facility.id}
                    className="nearby-item"
                    onClick={() => handleFacilitySelect(facility)}
                  >
                    <div className="nearby-icon">
                      <i className={`bi bi-${facility.type === 'hospital' ? 'hospital' : facility.type === 'clinic' ? 'plus-circle' : 'building'}`}></i>
                    </div>
                    <div className="nearby-content">
                      <h6>{facility.name}</h6>
                      <span className="distance">{facility.distance}</span>
                      <span className="wait-time">Thời gian chờ: {facility.waitTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="filters-section">
            <MapFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Facilities List */}
          <div className="facilities-list">
            <div className="list-header">
              <h5>
                <i className="bi bi-list-ul me-2"></i>
                Cơ Sở Y Tế ({filteredFacilities.length})
              </h5>
              <span className="sort-options">
                <select 
                  className="form-select form-select-sm" 
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="distance">Sắp xếp: Gần nhất</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="price_low">Giá thấp nhất</option>
                  <option value="price_high">Giá cao nhất</option>
                </select>
              </span>
            </div>

            <div className="facilities-scroll">
              {filteredFacilities.map(facility => (
                <MedicalFacilityCard
                  key={facility.id}
                  facility={facility}
                  onSelect={handleFacilitySelect}
                  onBook={handleBookAppointment}
                  onShowReviews={handleShowReviews}
                  isSelected={selectedFacility?.id === facility.id}
                />
              ))}
              
              {filteredFacilities.length === 0 && (
                <div className="no-results">
                  <i className="bi bi-search"></i>
                  <h6>Không tìm thấy kết quả</h6>
                  <p>Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="map-area">
          <div className="map-placeholder">
            <div className="map-overlay">
              <i className="bi bi-map"></i>
              <h3>Bản Đồ Y Tế & Dịch Tễ</h3>
              <p>
                Hiển thị {filteredFacilities.length} cơ sở y tế 
                {showEpidemicZones && ' và thông tin vùng dịch'}
              </p>
              
              {/* Map Controls */}
              <div className="map-controls">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleMyLocation}
                >
                  <i className="bi bi-geo-alt me-1"></i>
                  Vị trí của tôi
                </button>
                <button 
                  className={`btn btn-sm ${showEpidemicZones ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={toggleEpidemicZones}
                >
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Vùng dịch
                </button>
              </div>

              {/* Map Legend */}
              <div className="map-legend">
                <div className="legend-item">
                  <div className="legend-color hospital"></div>
                  <span>Bệnh viện</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color clinic"></div>
                  <span>Phòng khám</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color medical-center"></div>
                  <span>Trung tâm y tế</span>
                </div>
                {showEpidemicZones && (
                  <>
                    <div className="legend-item">
                      <div className="legend-color high-risk"></div>
                      <span>Nguy cơ cao</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color medium-risk"></div>
                      <span>Nguy cơ trung bình</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color low-risk"></div>
                      <span>Nguy cơ thấp</span>
                    </div>
                  </>
                )}
              </div>

              {/* Selected Facility Info */}
              {selectedFacility && (
                <div className="selected-facility-info">
                  <h5>{selectedFacility.name}</h5>
                  <p>{selectedFacility.address}</p>
                  <div className="facility-actions">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleBookAppointment(selectedFacility)}
                    >
                      <i className="bi bi-calendar-plus me-1"></i>
                      Đặt lịch
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleShowReviews(selectedFacility)}
                    >
                      <i className="bi bi-chat-text me-1"></i>
                      Xem đánh giá
                    </button>
                  </div>
                </div>
              )}

              {/* Selected Zone Info */}
              {selectedZone && (
                <div className="selected-zone-info">
                  <h5>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {selectedZone.name}
                  </h5>
                  <div className="zone-risk-level" style={{ color: getRiskLevelColor(selectedZone.level) }}>
                    {getRiskLevelText(selectedZone.level)}
                  </div>
                  <p>{selectedZone.cases} ca bệnh • +{selectedZone.newCases} mới</p>
                  <div className="zone-diseases">
                    {selectedZone.diseases.map((disease, index) => (
                      <span key={index} className="disease-tag">
                        {disease}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Facility Markers */}
              <div className="facility-markers">
                {filteredFacilities.map((facility, index) => (
                  <div
                    key={facility.id}
                    className={`facility-marker ${facility.type} ${selectedFacility?.id === facility.id ? 'selected' : ''}`}
                    style={{
                      left: `${15 + (index % 4) * 20}%`,
                      top: `${25 + Math.floor(index / 4) * 18}%`
                    }}
                    onClick={() => handleFacilitySelect(facility)}
                    title={facility.name}
                  >
                    <i className={`bi bi-${facility.type === 'hospital' ? 'hospital' : facility.type === 'clinic' ? 'plus-circle' : 'building'}`}></i>
                    <div className="marker-rating">{facility.rating}</div>
                  </div>
                ))}
              </div>

              {/* Epidemic Zone Markers */}
              {showEpidemicZones && mockEpidemicData.zones.map((zone, index) => (
                <div
                  key={zone.id}
                  className={`zone-marker ${zone.level} ${selectedZone?.id === zone.id ? 'selected' : ''}`}
                  style={{
                    left: `${20 + (index % 3) * 25}%`,
                    top: `${60 + Math.floor(index / 3) * 15}%`
                  }}
                  onClick={() => handleZoneSelect(zone)}
                  title={`${zone.name} - ${getRiskLevelText(zone.level)}`}
                >
                  <i className="bi bi-exclamation-triangle"></i>
                  <div className="zone-radius"></div>
                </div>
              ))}

              {/* User Location Marker */}
              {userLocation && (
                <div
                  className="user-location-marker"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  title="Vị trí của bạn"
                >
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedFacility && (
        <BookingModal
          facility={selectedFacility}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {/* Reviews Modal */}
      {showReviewsModal && selectedFacility && (
        <div className="modal-overlay">
          <div className="reviews-modal">
            <div className="modal-header">
              <h4>Đánh giá - {selectedFacility.name}</h4>
              <button className="btn-close" onClick={() => setShowReviewsModal(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <ReviewsSection 
                facilityId={selectedFacility.id}
                facility={selectedFacility}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for risk levels
const getRiskLevelColor = (level) => {
  switch (level) {
    case 'high': return '#dc3545';
    case 'medium': return '#ffc107';
    case 'low': return '#28a745';
    default: return '#6c757d';
  }
};

const getRiskLevelText = (level) => {
  switch (level) {
    case 'high': return 'Nguy cơ cao';
    case 'medium': return 'Nguy cơ trung bình';
    case 'low': return 'Nguy cơ thấp';
    default: return 'Không xác định';
  }
};

export default PublicMapPage;