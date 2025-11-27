import React, { useState } from 'react';
import PolygonDrawer from '../../MapComponents/PolygonDrawer/PolygonDrawer';
import './OutbreakForm.css';

const OutbreakForm = ({ onSubmit, initialData, mode = 'create' }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    diseaseType: 'dengue_fever',
    province: '',
    district: '',
    severity: 'medium',
    status: 'active',
    cases: 0,
    deaths: 0,
    startDate: new Date().toISOString().split('T')[0],
    description: '',
    preventiveMeasures: [],
    affectedAreas: [],
    contactPerson: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  // eslint-disable-next-line
  const [drawnPolygons, setDrawnPolygons] = useState([]); 

  const diseaseTypes = [
    { value: 'dengue_fever', label: 'Sốt xuất huyết', color: '#e74c3c' },
    { value: 'covid_19', label: 'COVID-19', color: '#3498db' },
    { value: 'influenza', label: 'Cúm', color: '#9b59b6' },
    { value: 'hand_foot_mouth', label: 'Tay chân miệng', color: '#f39c12' },
    { value: 'measles', label: 'Sởi', color: '#e67e22' },
    { value: 'other', label: 'Khác', color: '#95a5a6' }
  ];

  const preventiveMeasures = [
    'Cách ly khu vực',
    'Phun thuốc khử trùng',
    'Tiêm chủng khẩn cấp',
    'Hạn chế tụ tập',
    'Đeo khẩu trang bắt buộc',
    'Kiểm tra y tế',
    'Theo dõi sức khỏe',
    'Truy vết tiếp xúc'
  ];

  const provinces = [
    'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        [field]: value
      }
    }));
  };

  const handlePolygonComplete = (polygon) => {
    setDrawnPolygons(prev => [...prev, polygon]);
    setFormData(prev => ({
      ...prev,
      affectedAreas: [...prev.affectedAreas, {
        coordinates: polygon,
        area: polygon.length * 100 // Giả lập tính diện tích
      }]
    }));
  };

  const toggleMeasure = (measure) => {
    setFormData(prev => ({
      ...prev,
      preventiveMeasures: prev.preventiveMeasures.includes(measure)
        ? prev.preventiveMeasures.filter(m => m !== measure)
        : [...prev.preventiveMeasures, measure]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // const getDiseaseColor = (diseaseType) => {
  //   const disease = diseaseTypes.find(d => d.value === diseaseType);
  //   return disease ? disease.color : '#95a5a6';
  // };

  return (
    <div className="outbreak-form">
      <div className="form-header">
        <h4>
          {mode === 'create' ? 'Khai Báo Vùng Dịch Mới' : 'Chỉnh Sửa Vùng Dịch'}
        </h4>
        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <span>1</span>
            Thông tin dịch
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <span>2</span>
            Khoanh vùng
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span>3</span>
            Biện pháp
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Outbreak Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Tên vùng dịch *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="VD: Dịch sốt xuất huyết Quận Ba Đình"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Loại bệnh dịch *</label>
                  <div className="disease-selector">
                    {diseaseTypes.map(disease => (
                      <div
                        key={disease.value}
                        className={`disease-option ${formData.diseaseType === disease.value ? 'selected' : ''}`}
                        onClick={() => handleInputChange('diseaseType', disease.value)}
                        style={{ '--disease-color': disease.color }}
                      >
                        <div className="color-indicator"></div>
                        <span>{disease.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Tỉnh/Thành phố *</label>
                  <select
                    className="form-control"
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Quận/Huyện *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    placeholder="VD: Ba Đình"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Mức độ nghiêm trọng *</label>
                  <select
                    className="form-control"
                    value={formData.severity}
                    onChange={(e) => handleInputChange('severity', e.target.value)}
                    required
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                    <option value="critical">Rất cao</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Số ca nhiễm *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.cases}
                    onChange={(e) => handleInputChange('cases', parseInt(e.target.value) || 0)}
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Số ca tử vong</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.deaths}
                    onChange={(e) => handleInputChange('deaths', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Ngày bắt đầu *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Trạng thái *</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    required
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="monitoring">Đang theo dõi</option>
                    <option value="contained">Đã kiểm soát</option>
                    <option value="resolved">Đã kết thúc</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Mô tả tình hình dịch</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Mô tả chi tiết về tình hình dịch, diễn biến, đặc điểm..."
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Tiếp theo <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Area Mapping */}
        {currentStep === 2 && (
          <div className="form-step">
            <div className="form-group">
              <label>Khoanh vùng dịch trên bản đồ *</label>
              <p className="form-help">
                Vẽ các polygon để xác định khu vực bị ảnh hưởng bởi dịch bệnh.
                Mỗi polygon đại diện cho một vùng dịch riêng biệt.
              </p>
              <PolygonDrawer
                onPolygonComplete={handlePolygonComplete}
                initialPolygon={formData.affectedAreas[0]?.coordinates}
                height="400px"
              />
            </div>

            {formData.affectedAreas.length > 0 && (
              <div className="affected-areas-list">
                <h6>Vùng dịch đã xác định:</h6>
                {formData.affectedAreas.map((area, index) => (
                  <div key={index} className="area-item">
                    <div className="area-header">
                      <span>Vùng #{index + 1}</span>
                      <span className="area-size">{area.area} km²</span>
                    </div>
                    <div className="area-points">
                      {area.coordinates.length} điểm
                    </div>
                  </div>
                ))}
              </div>
            )}

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

        {/* Step 3: Preventive Measures */}
        {currentStep === 3 && (
          <div className="form-step">
            <div className="form-group">
              <label>Biện pháp phòng ngừa đã áp dụng</label>
              <div className="measures-selector">
                {preventiveMeasures.map(measure => (
                  <div
                    key={measure}
                    className={`measure-option ${formData.preventiveMeasures.includes(measure) ? 'selected' : ''}`}
                    onClick={() => toggleMeasure(measure)}
                  >
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{measure}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Người liên hệ xử lý dịch</label>
              <div className="contact-person">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Họ tên *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.contactPerson.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        placeholder="VD: Nguyễn Văn A"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Số điện thoại *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formData.contactPerson.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        placeholder="VD: 0912345678"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.contactPerson.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        placeholder="VD: contact@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="outbreak-summary">
              <h6>Tóm tắt thông tin vùng dịch:</h6>
              <div className="summary-grid">
                <div className="summary-item">
                  <label>Tên vùng dịch:</label>
                  <span>{formData.name}</span>
                </div>
                <div className="summary-item">
                  <label>Loại bệnh:</label>
                  <span>
                    {diseaseTypes.find(d => d.value === formData.diseaseType)?.label}
                  </span>
                </div>
                <div className="summary-item">
                  <label>Khu vực:</label>
                  <span>{formData.district}, {formData.province}</span>
                </div>
                <div className="summary-item">
                  <label>Số ca nhiễm:</label>
                  <span>{formData.cases} ca</span>
                </div>
                <div className="summary-item">
                  <label>Số vùng đã khoanh:</label>
                  <span>{formData.affectedAreas.length} vùng</span>
                </div>
                <div className="summary-item">
                  <label>Biện pháp áp dụng:</label>
                  <span>{formData.preventiveMeasures.length} biện pháp</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
                <i className="bi bi-arrow-left me-1"></i> Quay lại
              </button>
              <button type="submit" className="btn btn-success">
                <i className="bi bi-check-circle me-1"></i>
                {mode === 'create' ? 'Khai báo dịch' : 'Cập nhật'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default OutbreakForm;