import React, { useState, useEffect } from 'react';
import MapPicker from '../../MapComponents/MapPicker/MapPicker';
import './PharmacyForm.css';
import { jwtDecode } from "jwt-decode";

const PharmacyForm = ({ onSubmit, initialData, mode = 'create' }) => {

  const defaultFormData = {
    name: '',
    address: '',
    phone: '',
    province: '',
    location: null
  };

  const token = localStorage.getItem("authToken");
  let decodedToken = null;
  if (token) decodedToken = jwtDecode(token);
  const userId = decodedToken?.user_id;

  const [formData, setFormData] = useState(defaultFormData);
  
  // SỬA: Xử lý mapping dữ liệu từ initialData
  useEffect(() => {
    console.log("PharmacyForm received initialData:", initialData);
    
    if (initialData && Object.keys(initialData).length > 0) {
      // Map dữ liệu từ API (có pharmacy_name) sang form (dùng name)
      setFormData({
        name: initialData.pharmacy_name || initialData.name || '',
        address: initialData.address || '',
        phone: initialData.phone || '',
        province: initialData.province_id || initialData.province || '',
        location: initialData.pharmacy_point_id || initialData.location || null
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData]);

  const [currentStep, setCurrentStep] = useState(1);

  const provinces = [
    "Hà Nội","Hải Phòng","Đà Nẵng","TP. Hồ Chí Minh","Cần Thơ","Tuyên Quang","Lào Cai",
    "Thái Nguyên","Phú Thọ","Bắc Ninh","Hưng Yên","Ninh Bình","Quảng Trị","Quảng Ngãi",
    "Gia Lai","Khánh Hòa","Lâm Đồng","Đắk Lắk","Đồng Nai","Tây Ninh","Vĩnh Long",
    "An Giang","Đồng Tháp","Cà Mau"
  ];

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({
      ...prev,
      location,
      address: location.address
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo payload phù hợp cho cả create và update
    const payload = {
      pharmacy_name: formData.name,  // Map từ formData.name
      pharmacy_point_id: formData.location || null,
      creator_id: userId,
      address: formData.address,
      province_id: formData.province
    };

    // Nếu là chỉnh sửa, thêm ID vào payload
    if (mode === 'edit' && initialData && initialData.pharmacy_id) {
      payload.id = initialData.pharmacy_id;
    }

    try {
      const token = localStorage.getItem("authToken");
      
      // SỬA: Dùng method PUT nếu là edit
      const method = mode === 'edit' ? 'PUT' : 'POST';
      const url = mode === 'edit' 
        ? `http://localhost:3001/api/pharmacies/${initialData.pharmacy_id}` 
        : "http://localhost:3001/api/pharmacies";
      
      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      console.log(`${mode} pharmacy result:`, result);

      // Lấy dữ liệu trả về
      const responseData = result && result.pharmacy_id ? result : (result.data || result.created || null);

      if (res.ok && responseData) {
        // Gọi callback với dữ liệu đã được xử lý
        if (typeof onSubmit === 'function') {
          onSubmit(responseData);
        }
        alert(mode === 'edit' ? "Cập nhật nhà thuốc thành công!" : "Thêm nhà thuốc thành công!");
      } else {
        console.error(`${mode} pharmacy failed:`, result);
        alert(result?.message || `Có lỗi xảy ra khi ${mode === 'edit' ? 'cập nhật' : 'thêm'} nhà thuốc`);
      }
    } catch (err) {
      console.error(`${mode} pharmacy error:`, err);
      alert(`Có lỗi mạng khi ${mode === 'edit' ? 'cập nhật' : 'thêm'} nhà thuốc`);
    }
  };

  return (
    <div className="pharmacy-form">
      <div className="form-header">
        <h4>
          {mode === 'create' ? 'Thêm Nhà Thuốc' : 'Chỉnh Sửa Nhà Thuốc'}
          {mode === 'edit' && initialData && initialData.pharmacy_name && 
            `: ${initialData.pharmacy_name}`}
        </h4>

        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <span>1</span> Thông tin
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <span>2</span> Vị trí
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span>3</span> Hoàn tất
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="form-step">
            <div className="form-group">
              <label>Tên nhà thuốc *</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="VD: Nhà thuốc Minh Châu"
                required
              />
              {/* DEBUG: Hiển thị giá trị ban đầu */}
              {initialData && initialData.pharmacy_name && (
                <small className="text-muted">
                  Giá trị ban đầu: {initialData.pharmacy_name}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Tỉnh/Thành phố *</label>
              <select
                className="form-control"
                value={formData.province}
                onChange={(e) => handleInputChange('province', e.target.value)}
                required
              >
                <option value="">-- Chọn tỉnh/thành --</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Địa chỉ *</label>
              <textarea
                className="form-control"
                rows="2"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Số nhà, đường, phường/xã, quận/huyện"
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-primary ms-auto" onClick={nextStep}>
                Tiếp theo <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="form-step">
            <div className="form-group">
              <label>Chọn vị trí trên bản đồ *</label>
              <MapPicker
                onLocationSelect={handleLocationSelect}
                initialLocation={formData.location}
                height="300px"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
                <i className="bi bi-arrow-left me-1"></i> Quay lại
              </button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Tiếp theo <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="form-step">
            <div className="form-summary">
              <h5>Xác nhận thông tin</h5>
              <div className="summary-grid">
                <div className="summary-item">
                  <label>Tên nhà thuốc:</label>
                  <span className="fw-bold">{formData.name || '(Chưa nhập)'}</span>
                </div>
                <div className="summary-item">
                  <label>Tỉnh/Thành:</label>
                  <span>{formData.province || '(Chưa chọn)'}</span>
                </div>
                <div className="summary-item" style={{ gridColumn: 'span 2' }}>
                  <label>Địa chỉ:</label>
                  <span>{formData.address || '(Chưa nhập)'}</span>
                </div>
                {mode === 'edit' && initialData && (
                  <div className="summary-item">
                    <label>ID nhà thuốc:</label>
                    <span className="text-muted">{initialData.pharmacy_id}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
                <i className="bi bi-arrow-left me-1"></i> Quay lại
              </button>

              <button type="submit" className="btn btn-success">
                <i className="bi bi-check-circle me-1"></i>
                {mode === 'create' ? 'Thêm nhà thuốc' : 'Cập nhật'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PharmacyForm;