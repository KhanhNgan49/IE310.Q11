import React, { useState } from 'react';
import './OutbreakManagement.css';

const OutbreakManagement = () => {
  const [activeTab, setActiveTab] = useState('active');

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
      lastUpdated: '2 giờ trước'
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
      lastUpdated: '5 giờ trước'
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
      lastUpdated: '1 ngày trước'
    },
    {
      id: 4,
      name: 'COVID-19 Cluster Quận Đống Đa',
      province: 'Hà Nội',
      district: 'Đống Đa',
      cases: 18,
      severity: 'medium',
      status: 'contained',
      startDate: '2024-01-05',
      lastUpdated: '3 ngày trước'
    }
  ];

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
      contained: { label: 'Đã kiểm soát', class: 'success' }
    };
    const statusConfig = config[status] || { label: status, class: 'secondary' };
    return <span className={`badge bg-${statusConfig.class}`}>{statusConfig.label}</span>;
  };

  return (
    <div className="outbreak-management">
      <div className="section-header">
        <div className="header-content">
          <h2>Quản Lý Vùng Dịch</h2>
          <p>Theo dõi và quản lý các vùng dịch bệnh trên toàn quốc</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary me-2">
            <i className="bi bi-plus-circle me-2"></i>
            Thêm Vùng Dịch
          </button>
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>
            Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="alert alert-warning">
        <div className="alert-content">
          <i className="bi bi-exclamation-triangle-fill"></i>
          <div>
            <strong>Cảnh báo:</strong> Hiện có <strong>2 vùng dịch</strong> đang ở mức độ cao cần theo dõi chặt chẽ.
          </div>
        </div>
      </div>

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
          <small>Hiển thị trực quan các khu vực có dịch bệnh</small>
        </div>
      </div>

      {/* Outbreaks List */}
      <div className="outbreaks-list">
        <div className="list-header">
          <h5>Danh Sách Vùng Dịch</h5>
          <div className="filter-tabs">
            <button
              className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Đang hoạt động
            </button>
            <button
              className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
              onClick={() => setActiveTab('monitoring')}
            >
              Theo dõi
            </button>
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </button>
          </div>
        </div>

        <div className="outbreaks-grid">
          {outbreaks.map(outbreak => (
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
                    <span>{outbreak.cases} ca nhiễm</span>
                  </div>
                  <div className="info-item">
                    <i className="bi bi-calendar"></i>
                    <span>Bắt đầu: {outbreak.startDate}</span>
                  </div>
                  <div className="info-item">
                    <i className="bi bi-clock"></i>
                    <span>Cập nhật: {outbreak.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-pencil me-1"></i>
                  Chỉnh sửa
                </button>
                <button className="btn btn-sm btn-outline-info">
                  <i className="bi bi-graph-up me-1"></i>
                  Thống kê
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="bi bi-trash me-1"></i>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-outbreak">
        <h5>Hành Động Nhanh</h5>
        <div className="action-buttons">
          <button className="btn btn-outline-primary">
            <i className="bi bi-send me-2"></i>
            Gửi cảnh báo
          </button>
          <button className="btn btn-outline-warning">
            <i className="bi bi-clipboard-data me-2"></i>
            Báo cáo hàng ngày
          </button>
          <button className="btn btn-outline-info">
            <i className="bi bi-shield-check me-2"></i>
            Biện pháp phòng ngừa
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutbreakManagement;