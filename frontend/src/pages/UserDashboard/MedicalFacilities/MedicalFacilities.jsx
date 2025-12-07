// src/pages/UserDashboard/MedicalFacilities/MedicalFacilities.jsx
import React, { useState, useEffect } from 'react';
import './MedicalFacilities.css';
import FacilityForm from '../FormComponents/FacilityForm/FacilityForm';

const MedicalFacilities = ({ onAddFacility, onEditFacility, onDeleteFacility }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // THÊM: state cho modal form (giống Pharmacies.jsx)
  const [showForm, setShowForm] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch('http://localhost:3001/api/medical-facilities');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();

        // Nếu backend trả object chứa key (vd: { data: [...] })
        const list = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);

        // Normalize + safe parse services
        const mapped = list.map(item => {
          // services có thể là null, '', JSON string or already array
          let servicesArr = [];
          try {
            if (Array.isArray(item.services)) {
              servicesArr = item.services;
            } else {
              servicesArr = JSON.parse(item.services || '[]');
            }
          } catch (err) {
            servicesArr = [];
          }

          return {
            id: item.facility_id || item.id || item.facilityId || item._id,
            raw: item, // giữ bản gốc nếu cần edit
            name: item.facility_name || item.name || '',
            type: item.type_id || item.type || '',
            address: item.address || '',
            phone: item.phone || '—',
            status: item.status || 'unknown',
            verified: item.verified ?? true,
            services: servicesArr,
            lastUpdated: item.updatedAt ? item.updatedAt.slice(0,10) : ''
          };
        });

        setFacilities(mapped);
      } catch (err) {
        console.error("Error fetching facilities:", err);
        setErrorMsg(err.message || 'Lỗi khi lấy dữ liệu');
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  // THÊM: hàm xử lý khi thêm thành công (giống Pharmacies.jsx)
  const handleAddFacilityResult = (created) => {
    // created có thể dùng key 'facility_id'
    // Thêm lên đầu danh sách để thấy ngay
    setFacilities(prev => [created, ...prev]);
    // Ẩn form
    setShowForm(false);
  };

  // THÊM: hàm xử lý khi chỉnh sửa thành công (giống Pharmacies.jsx)
  const handleEditFacilityResult = (updated) => {
    setFacilities(prev => prev.map(f => 
      (f.id === updated.facility_id || f.id === updated.id ? updated : f)
    ));
    setEditingFacility(null);
    setShowForm(false);
  };

  // THÊM: hàm xử lý xóa (giống Pharmacies.jsx)
  const handleDeleteClick = async (facilityId, facilityName) => {
    // Sử dụng prop nếu có, nếu không dùng window.confirm
    if (onDeleteFacility) {
      // Gọi prop function
      onDeleteFacility(facilityId);
    } else {
      // Fallback: dùng window.confirm
      if (!window.confirm(`Xác nhận xóa cơ sở "${facilityName}"?`)) return;
      
      console.log("Deleting facility ID:", facilityId);
      
      try {
        const response = await fetch(`http://localhost:3001/api/medical-facilities/${facilityId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        // Cập nhật state local
        setFacilities(prev => prev.filter(f => f.id !== facilityId));
        alert(`Đã xóa cơ sở "${facilityName}" thành công!`);
      } catch (err) {
        console.error("Error deleting facility:", err);
        alert(`Xóa thất bại: ${err.message}`);
      }
    }
  };

  const filteredFacilities = facilities.filter(facility => {
    const q = (searchTerm || '').toString().toLowerCase();
    const name = (facility.name || '').toString().toLowerCase();
    const addr = (facility.address || '').toString().toLowerCase();
    const matchesTab = activeTab === 'all' || (facility.status || '') === activeTab;
    return matchesTab && (name.includes(q) || addr.includes(q));
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Hoạt động', class: 'success' },
      pending: { label: 'Chờ duyệt', class: 'warning' },
      inactive: { label: 'Ngừng hoạt động', class: 'danger' }
    };
    const config = statusConfig[status] || { label: status || 'Không rõ', class: 'secondary' };
    return <span className={`badge bg-${config.class}`}>{config.label}</span>;
  };

  if (loading) return <div className="text-center py-4">Đang tải dữ liệu...</div>;

  return (
    <div className="medical-facilities">
      <div className="section-header">
        <div className="header-content">
          <h2>Quản Lý Cơ Sở Y Tế</h2>
          <p>Quản lý thông tin các cơ sở y tế trên toàn quốc</p>
        </div>
        {/* SỬA: dùng setShowForm thay vì onAddFacility prop */}
        <button className="btn btn-primary" onClick={() => { setEditingFacility(null); setShowForm(true); }}>
          <i className="bi bi-plus-circle me-2"></i> Thêm Cơ Sở Mới
        </button>
      </div>

      <div className="facilities-controls">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm cơ sở y tế (tên hoặc địa chỉ)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="filter-tabs">
              <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Tất cả</button>
              <button className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Đang hoạt động</button>
              <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Chờ duyệt</button>
            </div>
          </div>
        </div>
      </div>

      {errorMsg && <div className="alert alert-danger mt-3">Lỗi: {errorMsg}</div>}

      <div className="facilities-table-container mt-3">
        {filteredFacilities.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-hospital"></i>
            <h5>Không tìm thấy cơ sở y tế nào</h5>
            <p>Thử thay đổi điều kiện tìm kiếm hoặc thêm cơ sở mới</p>
            {/* THÊM: nút thêm cơ sở đầu tiên */}
            <button className="btn btn-primary mt-3" onClick={() => { setEditingFacility(null); setShowForm(true); }}>
              <i className="bi bi-plus-circle me-2"></i>
              Thêm Cơ Sở Đầu Tiên
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table facilities-table">
              <thead>
                <tr>
                  <th>Tên cơ sở</th>
                  <th>Loại hình</th>
                  <th>Địa chỉ</th>
                  <th>Liên hệ</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacilities.map(f => (
                  <tr key={f.id || f.name}>
                    <td><strong>{f.name}</strong></td>
                    <td>{f.type}</td>
                    <td><small>{f.address}</small></td>
                    <td>{f.phone}</td>
                    <td>{getStatusBadge(f.status)}</td>
                    <td>
                      <div className="action-buttons">
                        {/* SỬA: Truyền toàn bộ raw data, không chỉ f.raw */}
                        <button 
                          className="btn btn-sm btn-outline-primary" 
                          onClick={() => { 
                            console.log("Editing facility - Full object:", f);
                            console.log("Facility name:", f.name);
                            console.log("Facility ID:", f.id);
                            console.log("Raw data:", f.raw);
                            
                            // Tạo object đầy đủ với tất cả field cần thiết
                          const facilityData = {
                            facility_id: f.id,
                            id: f.id,
                            facility_name: f.name,
                            name: f.name,
                            type_id: f.type,
                            type: f.type,
                            address: f.address,
                            phone: f.phone,
                            province_id: f.raw?.province_id || '',
                            province: f.raw?.province || '',
                            services: f.services,
                            status: f.status,
                            // SỬA: Xử lý location an toàn
                            location: f.raw?.facility_point_id || null,
                            facility_point_id: f.raw?.facility_point_id || null
                          };;
                            
                            console.log("Data to pass to form:", facilityData);
                            setEditingFacility(facilityData);
                            setShowForm(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        
                        <button 
                          className="btn btn-sm btn-outline-info" 
                          onClick={() => alert(`Chi tiết: ${f.name}\nĐịa chỉ: ${f.address}\nLoại: ${f.type}\nTrạng thái: ${f.status}`)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        
                        {/* SỬA: dùng handleDeleteClick */}
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => handleDeleteClick(f.id, f.name)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* THÊM: Modal form (giống Pharmacies.jsx) */}
      {showForm && (
        <div className="modal-overlay active">
          <div className="modal-container">
            <div className="modal-content large">
              <div className="modal-header">
                <h5>{editingFacility ? 'Chỉnh Sửa Cơ Sở Y Tế' : 'Thêm Cơ Sở Y Tế Mới'}</h5>
                <button className="btn-close" onClick={() => { setShowForm(false); setEditingFacility(null); }}></button>
              </div>
              <div className="modal-body">
                <FacilityForm
                  initialData={editingFacility || {}}
                  mode={editingFacility ? 'edit' : 'create'}
                  onSubmit={(createdOrUpdated) => {
                    // nếu mode create -> created mới có facility_id chưa tồn tại trong list
                    if (editingFacility) {
                      handleEditFacilityResult(createdOrUpdated);
                    } else {
                      handleAddFacilityResult(createdOrUpdated);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalFacilities;