import React, { useState, useEffect } from 'react';
import './EpidemicZones.css';

const EpidemicZones = ({ onZoneSelect, userLocation }) => {
  const [epidemicData, setEpidemicData] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showZones, setShowZones] = useState(true);

  // Dữ liệu mẫu về các vùng dịch
  const mockEpidemicData = {
    lastUpdated: '2024-01-20 14:30:00',
    zones: [
      {
        id: 1,
        name: 'Quận Đống Đa',
        level: 'high', // high, medium, low
        cases: 247,
        newCases: 15,
        riskDescription: 'Nguy cơ cao - Ổ dịch mới',
        affectedAreas: ['Phường Trung Tự', 'Phường Phương Liên', 'Phường Khâm Thiên'],
        diseases: ['COVID-19', 'Sốt xuất huyết'],
        coordinates: { lat: 21.018, lng: 105.832 },
        radius: 2.5, // km
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

  useEffect(() => {
    // Giả lập fetch data từ API
    const fetchEpidemicData = async () => {
      setTimeout(() => {
        setEpidemicData(mockEpidemicData);
      }, 1000);
    };

    fetchEpidemicData();
  }, []);

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    if (onZoneSelect) {
      onZoneSelect(zone);
    }
  };

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

  const calculateDistanceFromUser = (zoneCoord) => {
    if (!userLocation) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = (zoneCoord.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (zoneCoord.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(zoneCoord.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  if (!epidemicData) {
    return (
      <div className="epidemic-zones">
        <div className="loading">Đang tải thông tin dịch tễ...</div>
      </div>
    );
  }

  return (
    <div className="epidemic-zones">
      <div className="epidemic-header">
        <h5>
          <i className="bi bi-exclamation-triangle me-2"></i>
          Thông Tin Dịch Tễ
        </h5>
        <div className="header-actions">
          <button 
            className={`btn btn-sm ${showZones ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setShowZones(!showZones)}
          >
            <i className={`bi bi-eye${showZones ? '-fill' : ''} me-1`}></i>
            {showZones ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="epidemic-stats">
        <div className="stat-item total-cases">
          <div className="stat-value">{epidemicData.statistics.totalCases}</div>
          <div className="stat-label">Tổng ca</div>
        </div>
        <div className="stat-item active-cases">
          <div className="stat-value">{epidemicData.statistics.activeCases}</div>
          <div className="stat-label">Đang điều trị</div>
        </div>
        <div className="stat-item high-risk">
          <div className="stat-value">{epidemicData.statistics.highRiskZones}</div>
          <div className="stat-label">Vùng nguy cơ cao</div>
        </div>
      </div>

      {/* Danh sách vùng dịch */}
      {showZones && (
        <div className="zones-list">
          <div className="zones-header">
            <span>Khu vực ({epidemicData.zones.length})</span>
            <small className="text-muted">
              Cập nhật: {new Date(epidemicData.lastUpdated).toLocaleDateString('vi-VN')}
            </small>
          </div>
          
          {epidemicData.zones.map(zone => (
            <div
              key={zone.id}
              className={`zone-item ${selectedZone?.id === zone.id ? 'selected' : ''}`}
              onClick={() => handleZoneSelect(zone)}
            >
              <div className="zone-header">
                <h6 className="zone-name">{zone.name}</h6>
                <div 
                  className="risk-badge"
                  style={{ backgroundColor: getRiskLevelColor(zone.level) }}
                >
                  {getRiskLevelText(zone.level)}
                </div>
              </div>
              
              <div className="zone-details">
                <div className="cases-info">
                  <span className="total-cases">{zone.cases} ca</span>
                  {zone.newCases > 0 && (
                    <span className="new-cases">+{zone.newCases} mới</span>
                  )}
                </div>
                
                <div className="diseases">
                  {zone.diseases.map((disease, index) => (
                    <span key={index} className="disease-tag">
                      {disease}
                    </span>
                  ))}
                </div>

                {userLocation && (
                  <div className="distance-info">
                    <i className="bi bi-geo-alt me-1"></i>
                    Cách bạn: {calculateDistanceFromUser(zone.coordinates)} km
                  </div>
                )}

                <div className="affected-areas">
                  <strong>Khu vực ảnh hưởng:</strong> {zone.affectedAreas.join(', ')}
                </div>

                <div className="zone-description">
                  {zone.riskDescription}
                </div>
              </div>

              <div className="zone-footer">
                <small className="text-muted">
                  Cập nhật: {new Date(zone.updateDate).toLocaleDateString('vi-VN')}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cảnh báo nếu có vùng dịch gần */}
      {userLocation && showZones && (
        <div className="proximity-alerts">
          {epidemicData.zones
            .filter(zone => {
              const distance = calculateDistanceFromUser(zone.coordinates);
              return distance && distance < 5; // Cảnh báo nếu trong bán kính 5km
            })
            .map(zone => (
              <div key={zone.id} className="proximity-alert warning">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Có vùng dịch {zone.name} cách bạn {calculateDistanceFromUser(zone.coordinates)} km
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default EpidemicZones;