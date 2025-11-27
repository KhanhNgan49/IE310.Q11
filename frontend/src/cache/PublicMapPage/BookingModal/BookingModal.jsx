import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ facility, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientAge: '',
    patientGender: '',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
    notes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const timeSlots = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      facilityId: facility.id,
      facilityName: facility.name,
      timestamp: new Date().toISOString()
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const isStep1Valid = formData.patientName && 
    formData.patientPhone && 
    formData.patientAge && 
    formData.patientGender;

  const isStep2Valid = formData.appointmentDate && formData.appointmentTime;

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        {/* Header */}
        <div className="modal-header">
          <h4>Đặt Lịch Khám</h4>
          <button className="btn-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        {/* Facility Info */}
        <div className="facility-info">
          <h5>{facility.name}</h5>
          <p className="facility-address">
            <i className="bi bi-geo-alt me-1"></i>
            {facility.address}
          </p>
          <p className="facility-phone">
            <i className="bi bi-telephone me-1"></i>
            {facility.phone}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Thông tin bệnh nhân</span>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Chọn thời gian</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Xác nhận</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Patient Information */}
          {currentStep === 1 && (
            <div className="step-content">
              <h6>Thông Tin Bệnh Nhân</h6>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Họ và tên *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên đầy đủ"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleInputChange}
                      placeholder="Nhập email (nếu có)"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Tuổi *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="patientAge"
                      value={formData.patientAge}
                      onChange={handleInputChange}
                      placeholder="Tuổi"
                      min="0"
                      max="120"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Giới tính *</label>
                    <select
                      className="form-select"
                      name="patientGender"
                      value={formData.patientGender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Triệu chứng / Lý do khám</label>
                <textarea
                  className="form-control"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Mô tả triệu chứng hoặc lý do khám bệnh..."
                  rows="3"
                />
              </div>
            </div>
          )}

          {/* Step 2: Appointment Time */}
          {currentStep === 2 && (
            <div className="step-content">
              <h6>Chọn Thời Gian Khám</h6>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Ngày khám *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      min={getTomorrowDate()}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Giờ khám *</label>
                    <select
                      className="form-select"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn giờ khám</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="working-hours-info">
                <h6>Giờ làm việc của {facility.name}</h6>
                <div className="hours-detail">
                  <div className="hour-item">
                    <span>Sáng:</span>
                    <span>{facility.workingHours.morning}</span>
                  </div>
                  <div className="hour-item">
                    <span>Chiều:</span>
                    <span>{facility.workingHours.afternoon}</span>
                  </div>
                  {facility.workingHours.emergency !== 'Không' && (
                    <div className="hour-item emergency">
                      <span>Cấp cứu:</span>
                      <span>{facility.workingHours.emergency}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="step-content">
              <h6>Xác Nhận Thông Tin</h6>
              
              <div className="confirmation-info">
                <div className="info-section">
                  <h6>Thông tin bệnh nhân</h6>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Họ tên:</label>
                      <span>{formData.patientName}</span>
                    </div>
                    <div className="info-item">
                      <label>SĐT:</label>
                      <span>{formData.patientPhone}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{formData.patientEmail || 'Không có'}</span>
                    </div>
                    <div className="info-item">
                      <label>Tuổi:</label>
                      <span>{formData.patientAge}</span>
                    </div>
                    <div className="info-item">
                      <label>Giới tính:</label>
                      <span>
                        {formData.patientGender === 'male' ? 'Nam' : 
                         formData.patientGender === 'female' ? 'Nữ' : 'Khác'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h6>Thông tin lịch hẹn</h6>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Cơ sở:</label>
                      <span>{facility.name}</span>
                    </div>
                    <div className="info-item">
                      <label>Ngày:</label>
                      <span>{formData.appointmentDate}</span>
                    </div>
                    <div className="info-item">
                      <label>Giờ:</label>
                      <span>{formData.appointmentTime}</span>
                    </div>
                    <div className="info-item">
                      <label>Triệu chứng:</label>
                      <span>{formData.symptoms || 'Không có mô tả'}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-notes">
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Lưu ý:</strong> Vui lòng đến trước 15 phút để làm thủ tục. 
                    Mang theo CMND và thẻ BHYT (nếu có).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="modal-actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Quay lại
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !isStep1Valid) ||
                  (currentStep === 2 && !isStep2Valid)
                }
              >
                Tiếp theo
                <i className="bi bi-arrow-right ms-1"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
              >
                <i className="bi bi-check-circle me-1"></i>
                Xác nhận đặt lịch
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;