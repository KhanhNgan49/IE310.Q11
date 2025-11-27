import React, { useState } from 'react';
import './OutbreakManagement.css';

const OutbreakManagement = ({ onAddOutbreak, onEditOutbreak }) => {
  const [activeTab, setActiveTab] = useState('active');
  // eslint-disable-next-line
  const [selectedOutbreak, setSelectedOutbreak] = useState(null); 

  const outbreaks = [
    {
      id: 1,
      name: 'Dịch sốt xuất huyết Quận Ba Đình',
      province: 'Hà Nội',
      district: 'Ba Đình',
      cases: 127,
      severity: 'high',
      status: 'active',
      startDate: '2024-01-10',
      lastUpdated: '2 giờ trước',
      diseaseType: 'dengue_fever',
      description: 'Dịch sốt xuất huyết đang diễn biến phức tạp tại quận Ba Đình',
      preventiveMeasures: ['Phun thuốc khử trùng', 'Theo dõi sức khỏe'],
      contactPerson: {
        name: 'Nguyễn Văn A',
        phone: '0912345678',
        email: 'nguyenvana@example.com'
      },
      affectedAreas: [
        {
          coordinates: [
            { lat: 21.031, lng: 105.814 },
            { lat: 21.032, lng: 105.815 },
            { lat: 21.033, lng: 105.816 }
          ],
          area: 2.5
        }
      ]
    },
    {
      id: 2,
      name: 'Cúm A H5N1 Huyện Gia Lâm',
      province: 'Hà Nội',
      district: 'Gia Lâm',
      cases: 45,
      severity: 'medium',
      status: 'active',
      startDate: '2024-01-12',
      lastUpdated: '5 giờ trước',
      diseaseType: 'influenza',
      description: 'Ổ dịch cúm A H5N1 tại huyện Gia Lâm',
      preventiveMeasures: ['Cách ly khu vực', 'Tiêm chủng khẩn cấp'],
      contactPerson: {
        name: 'Trần Thị B',
        phone: '0912345679',
        email: 'tranthib@example.com'
      },
      affectedAreas: [
        {
          coordinates: [
            { lat: 21.041, lng: 105.954 },
            { lat: 21.042, lng: 105.955 },
            { lat: 21.043, lng: 105.956 }
          ],
          area: 1.8
        }
      ]
    },
    {
      id: 3,
      name: 'Tay chân miệng Quận Hoàn Kiếm',
      province: 'Hà Nội',
      district: 'Hoàn Kiếm',
      cases: 32,
      severity: 'low',
      status: 'monitoring',
      startDate: '2024-01-08',
      lastUpdated: '1 ngày trước',
      diseaseType: 'hand_foot_mouth',
      description: 'Dịch tay chân miệng tại các trường mầm non',
      preventiveMeasures: ['Kiểm tra y tế', 'Vệ sinh trường học'],
      contactPerson: {
        name: 'Lê Văn C',
        phone: '0912345680',
        email: 'levanc@example.com'
      },
      affectedAreas: [
        {
          coordinates: [
            { lat: 21.028, lng: 105.851 },
            { lat: 21.029, lng: 105.852 },
            { lat: 21.030, lng: 105.853 }
          ],
          area: 1.2
        }
      ]
    }
  ];

  const filteredOutbreaks = outbreaks.filter(outbreak => {
    if (activeTab === 'all') return true;
    return outbreak.status === activeTab;
  });

  const getSeverityBadge = (severity) => {
    const config = {
      high: { label: 'Cao', class: 'danger' },
      medium: { label: 'Trung bình', class: 'warning' },
      low: { label: 'Thấp', class: 'success' }
    };
    const severityConfig = config[severity] || { label: severity, class: 'secondary' };
    return <span className={`badge bg-${severityConfig.class}`}>{severityConfig.label}</span>;
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { label: 'Đang hoạt động', class: 'danger' },
      monitoring: { label: 'Đang theo dõi', class: 'warning' },
      contained: { label: 'Đã kiểm soát', class: 'success' },
      resolved: { label: 'Đã kết thúc', class: 'info' }
    };
    const statusConfig = config[status] || { label: status, class: 'secondary' };
    return <span className={`badge bg-${statusConfig.class}`}>{statusConfig.label}</span>;
  };

  const handleEditOutbreak = (outbreak) => {
    setSelectedOutbreak(outbreak);
    if (onEditOutbreak) {
      onEditOutbreak(outbreak);
    }
  };

  const handleDeleteOutbreak = (outbreakId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vùng dịch này?')) {
      console.log('Deleting outbreak:', outbreakId);
      // Gọi API xóa vùng dịch
      alert('Đã xóa vùng dịch thành công!');
    }
  };

  const handleViewStatistics = (outbreak) => {
    console.log('Viewing statistics for:', outbreak);
    // Mở modal thống kê hoặc chuyển trang
    alert(`Mở thống kê cho: ${outbreak.name}`);
  };

  const handleSendAlert = () => {
    if (window.confirm('Gửi cảnh báo đến tất cả người dân trong khu vực?')) {
      console.log('Sending alert to all users');
      alert('Đã gửi cảnh báo thành công!');
    }
  };

  const handleExportReport = () => {
    console.log('Exporting outbreak report');
    // Logic xuất báo cáo
    alert('Đã xuất báo cáo thành công!');
  };

  const handleDailyReport = () => {
    console.log('Creating daily report');
    // Logic tạo báo cáo hàng ngày
    alert('Đã tạo báo cáo hàng ngày!');
  };

  const handlePreventiveMeasures = () => {
    console.log('Viewing preventive measures');
    // Logic hiển thị biện pháp phòng ngừa
    alert('Mở danh sách biện pháp phòng ngừa');
  };

  // Thống kê nhanh
  const stats = {
    total: outbreaks.length,
    active: outbreaks.filter(o => o.status === 'active').length,
    highSeverity: outbreaks.filter(o => o.severity === 'high').length,
    totalCases: outbreaks.reduce((sum, o) => sum + o.cases, 0)
  };

  return (
    <div className="outbreak-management">
      <div className="section-header">
        <div className="header-content">
          <h2>Quản Lý Vùng Dịch</h2>
          <p>Theo dõi và quản lý các vùng dịch bệnh trên toàn quốc</p>
          
          {/* Quick Stats */}
          <div className="outbreak-stats-overview">
            <div className="stat-item">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Tổng vùng dịch</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.active}</div>
              <div className="stat-label">Đang hoạt động</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.highSeverity}</div>
              <div className="stat-label">Mức độ cao</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalCases}</div>
              <div className="stat-label">Tổng ca nhiễm</div>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary me-2"
            onClick={onAddOutbreak}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Thêm Vùng Dịch
          </button>
          <button 
            className="btn btn-outline-primary"
            onClick={handleExportReport}
          >
            <i className="bi bi-download me-2"></i>
            Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {stats.active > 0 && (
        <div className="alert alert-warning">
          <div className="alert-content">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <div>
              <strong>Cảnh báo:</strong> Hiện có <strong>{stats.active} vùng dịch</strong> đang hoạt động, 
              trong đó <strong>{stats.highSeverity} vùng</strong> ở mức độ cao cần theo dõi chặt chẽ.
            </div>
          </div>
        </div>
      )}

      {/* Outbreak Map Preview */}
      <div className="outbreak-map-preview">
        <div className="map-header">
          <h5>Bản Đồ Vùng Dịch</h5>
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-color high"></div>
              <span>Nguy cơ cao</span>
            </div>
            <div className="legend-item">
              <div className="legend-color medium"></div>
              <span>Nguy cơ trung bình</span>
            </div>
            <div className="legend-item">
              <div className="legend-color low"></div>
              <span>Nguy cơ thấp</span>
            </div>
          </div>
        </div>
        <div className="map-placeholder">
          <i className="bi bi-map"></i>
          <p>Bản đồ vùng dịch đang được cập nhật</p>
          <small>Hiển thị {outbreaks.length} vùng dịch trên toàn quốc</small>
          
          {/* Mini outbreak indicators */}
          <div className="outbreak-indicators">
            {outbreaks.slice(0, 3).map((outbreak, index) => (
              <div 
                key={outbreak.id}
                className={`outbreak-indicator ${outbreak.severity}`}
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 15}%`
                }}
                title={outbreak.name}
              >
                <i className="bi bi-virus"></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outbreaks List */}
      <div className="outbreaks-list">
        <div className="list-header">
          <h5>Danh Sách Vùng Dịch ({filteredOutbreaks.length})</h5>
          <div className="filter-tabs">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả ({outbreaks.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Đang hoạt động ({stats.active})
            </button>
            <button
              className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
              onClick={() => setActiveTab('monitoring')}
            >
              Theo dõi ({outbreaks.filter(o => o.status === 'monitoring').length})
            </button>
          </div>
        </div>

        {filteredOutbreaks.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-virus"></i>
            <h5>Không có vùng dịch nào</h5>
            <p>Không tìm thấy vùng dịch phù hợp với bộ lọc đã chọn</p>
            <button className="btn btn-primary mt-3" onClick={onAddOutbreak}>
              <i className="bi bi-plus-circle me-2"></i>
              Thêm Vùng Dịch Đầu Tiên
            </button>
          </div>
        ) : (
          <div className="outbreaks-grid">
            {filteredOutbreaks.map(outbreak => (
              <div key={outbreak.id} className="outbreak-card">
                <div className="card-header">
                  <h6>{outbreak.name}</h6>
                  <div className="header-badges">
                    {getSeverityBadge(outbreak.severity)}
                    {getStatusBadge(outbreak.status)}
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="outbreak-info">
                    <div className="info-item">
                      <i className="bi bi-geo-alt"></i>
                      <span>{outbreak.district}, {outbreak.province}</span>
                    </div>
                    <div className="info-item">
                      <i className="bi bi-people"></i>
                      <span className="cases-count">{outbreak.cases} ca nhiễm</span>
                    </div>
                    <div className="info-item">
                      <i className="bi bi-calendar"></i>
                      <span>Bắt đầu: {outbreak.startDate}</span>
                    </div>
                    <div className="info-item">
                      <i className="bi bi-clock"></i>
                      <span>Cập nhật: {outbreak.lastUpdated}</span>
                    </div>
                    {outbreak.contactPerson && (
                      <div className="info-item">
                        <i className="bi bi-person"></i>
                        <span>Liên hệ: {outbreak.contactPerson.name}</span>
                      </div>
                    )}
                  </div>

                  {outbreak.description && (
                    <div className="outbreak-description">
                      <p>{outbreak.description}</p>
                    </div>
                  )}

                  {outbreak.preventiveMeasures && outbreak.preventiveMeasures.length > 0 && (
                    <div className="preventive-measures">
                      <strong>Biện pháp đang áp dụng:</strong>
                      <div className="measures-tags">
                        {outbreak.preventiveMeasures.slice(0, 2).map((measure, index) => (
                          <span key={index} className="measure-tag">
                            {measure}
                          </span>
                        ))}
                        {outbreak.preventiveMeasures.length > 2 && (
                          <span className="measure-tag more">
                            +{outbreak.preventiveMeasures.length - 2} khác
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEditOutbreak(outbreak)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Chỉnh sửa
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-info"
                    onClick={() => handleViewStatistics(outbreak)}
                  >
                    <i className="bi bi-graph-up me-1"></i>
                    Thống kê
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteOutbreak(outbreak.id)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-outbreak">
        <h5>Hành Động Nhanh</h5>
        <div className="action-buttons">
          <button 
            className="btn btn-outline-primary"
            onClick={handleSendAlert}
          >
            <i className="bi bi-send me-2"></i>
            Gửi cảnh báo
          </button>
          <button 
            className="btn btn-outline-warning"
            onClick={handleDailyReport}
          >
            <i className="bi bi-clipboard-data me-2"></i>
            Báo cáo hàng ngày
          </button>
          <button 
            className="btn btn-outline-info"
            onClick={handlePreventiveMeasures}
          >
            <i className="bi bi-shield-check me-2"></i>
            Biện pháp phòng ngừa
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutbreakManagement;