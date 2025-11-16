import React, { useState } from 'react';
import './MedicalFacilities.css';

const MedicalFacilities = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const facilities = [
    {
      id: 1,
      name: 'Bệnh viện Bạch Mai',
      type: 'Bệnh viện',
      address: '78 Giải Phóng, Đống Đa, Hà Nội',
      phone: '024 3869 3731',
      status: 'active',
      verified: true,
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Bệnh viện Việt Đức',
      type: 'Bệnh viện',
      address: '40 Tràng Thi, Hoàn Kiếm, Hà Nội',
      phone: '024 3825 3531',
      status: 'active',
      verified: true,
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: 'Phòng khám Đa khoa Quốc tế',
      type: 'Phòng khám',
      address: '152 Xã Đàn, Đống Đa, Hà Nội',
      phone: '024 3576 1999',
      status: 'pending',
      verified: false,
      lastUpdated: '2024-01-16'
    },
    {
      id: 4,
      name: 'Trung tâm Y tế Quận Hoàn Kiếm',
      type: 'Trung tâm y tế',
      address: '26 Lê Thái Tổ, Hoàn Kiếm, Hà Nội',
      phone: '024 3825 2723',
      status: 'active',
      verified: true,
      lastUpdated: '2024-01-13'
    }
  ];

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || facility.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Hoạt động', class: 'success' },
      pending: { label: 'Chờ duyệt', class: 'warning' },
      inactive: { label: 'Ngừng hoạt động', class: 'danger' }
    };
    const config = statusConfig[status] || { label: status, class: 'secondary' };
    return <span className={`badge bg-${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="medical-facilities">
      <div className="section-header">
        <div className="header-content">
          <h2>Quản Lý Cơ Sở Y Tế</h2>
          <p>Quản lý thông tin các cơ sở y tế trên toàn quốc</p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Thêm Cơ Sở Mới
        </button>
      </div>

      {/* Filters and Search */}
      <div className="facilities-controls">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm cơ sở y tế..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="filter-tabs">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Tất cả
              </button>
              <button
                className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Đang hoạt động
              </button>
              <button
                className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Chờ duyệt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Table */}
      <div className="facilities-table-container">
        <div className="table-responsive">
          <table className="table facilities-table">
            <thead>
              <tr>
                <th>Tên cơ sở</th>
                <th>Loại hình</th>
                <th>Địa chỉ</th>
                <th>Liên hệ</th>
                <th>Trạng thái</th>
                <th>Xác minh</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilities.map(facility => (
                <tr key={facility.id}>
                  <td>
                    <div className="facility-name">
                      <strong>{facility.name}</strong>
                      {facility.verified && (
                        <i className="bi bi-patch-check-fill verified-badge" title="Đã xác minh"></i>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="facility-type">{facility.type}</span>
                  </td>
                  <td>
                    <div className="facility-address">
                      <small>{facility.address}</small>
                    </div>
                  </td>
                  <td>
                    <div className="facility-contact">
                      <div>{facility.phone}</div>
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(facility.status)}
                  </td>
                  <td>
                    {facility.verified ? (
                      <span className="text-success">
                        <i className="bi bi-check-circle-fill"></i> Đã xác minh
                      </span>
                    ) : (
                      <span className="text-warning">
                        <i className="bi bi-clock"></i> Chờ xác minh
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-outline-primary" title="Chỉnh sửa">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-info" title="Xem chi tiết">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Xóa">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFacilities.length === 0 && (
          <div className="empty-state">
            <i className="bi bi-hospital"></i>
            <h5>Không tìm thấy cơ sở y tế nào</h5>
            <p>Thử thay đổi điều kiện tìm kiếm hoặc thêm cơ sở mới</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="quick-stat">
            <div className="stat-icon">
              <i className="bi bi-hospital"></i>
            </div>
            <div className="stat-info">
              <h4>1,247</h4>
              <span>Tổng cơ sở</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="quick-stat">
            <div className="stat-icon">
              <i className="bi bi-check-circle"></i>
            </div>
            <div className="stat-info">
              <h4>1,189</h4>
              <span>Đã xác minh</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="quick-stat">
            <div className="stat-icon">
              <i className="bi bi-clock"></i>
            </div>
            <div className="stat-info">
              <h4>12</h4>
              <span>Chờ duyệt</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="quick-stat">
            <div className="stat-icon">
              <i className="bi bi-geo-alt"></i>
            </div>
            <div className="stat-info">
              <h4>63</h4>
              <span>Tỉnh thành</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacilities;