import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnlineBookingPage.css';

const OnlineBookingPage = () => {
  const navigate = useNavigate();
  
  // State cho form đặt lịch
  const [bookingData, setBookingData] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    date: '',
    time: '',
    facility: '',
    doctor: '',
    specialty: '',
    symptoms: '',
    notes: '',
    insurance: 'none',
    isReturningPatient: false
  });

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [paymentStep, setPaymentStep] = useState(1); // 1: Chọn phương thức, 2: Nhập thông tin
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({
  phone: '',
  name: '',
  accountNumber: '',
  bankName: '',
  bank: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardHolder: ''
});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingFee] = useState(50000); // Phí đặt chỗ cố định 50,000 VND
  
  // Danh sách cơ sở y tế
  const facilities = [
    { id: 1, name: 'Bệnh viện Đa khoa TP.HCM', type: 'hospital' },
    { id: 2, name: 'Phòng khám Đa khoa Quốc tế', type: 'clinic' },
    { id: 3, name: 'Trung tâm Y tế Quận 5', type: 'medical-center' },
    { id: 4, name: 'Bệnh viện Nhi Đồng', type: 'hospital' },
    { id: 5, name: 'Phòng khám Tai Mũi Họng Sài Gòn', type: 'clinic' }
  ];

  // Danh sách bác sĩ
  const doctors = [
    { id: 1, name: 'BS. Nguyễn Văn A', specialty: 'Nội tổng quát', facility: 1 },
    { id: 2, name: 'BS. Trần Thị B', specialty: 'Ngoại khoa', facility: 1 },
    { id: 3, name: 'BS. Lê Văn C', specialty: 'Nhi khoa', facility: 2 },
    { id: 4, name: 'BS. Phạm Thị D', specialty: 'Da liễu', facility: 2 },
    { id: 5, name: 'BS. Hoàng Văn E', specialty: 'Tai Mũi Họng', facility: 3 }
  ];

  // Danh sách chuyên khoa
  const specialties = [
    'Nội tổng quát', 'Ngoại khoa', 'Nhi khoa', 'Sản phụ khoa',
    'Tim mạch', 'Thần kinh', 'Da liễu', 'Tai mũi họng',
    'Răng hàm mặt', 'Mắt', 'Xét nghiệm', 'Cấp cứu'
  ];

  // Các khung giờ có sẵn
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ];

  // Danh sách bảo hiểm
  const insuranceOptions = [
    { value: 'none', label: 'Không có bảo hiểm' },
    { value: 'public', label: 'Bảo hiểm y tế' },
    { value: 'private_bv', label: 'Bảo hiểm Bảo Việt' },
    { value: 'private_prudential', label: 'Bảo hiểm Prudential' },
    { value: 'private_manulife', label: 'Bảo hiểm Manulife' }
  ];

  // Phương thức thanh toán
  const paymentMethods = [
    { id: 'credit_card', name: 'Thẻ tín dụng/ghi nợ', icon: 'bi-credit-card' },
    { id: 'momo', name: 'Ví MoMo', icon: 'bi-phone' },
    { id: 'zalopay', name: 'ZaloPay', icon: 'bi-chat-left' },
    { id: 'bank_transfer', name: 'Chuyển khoản ngân hàng', icon: 'bi-bank' },
    { id: 'vnpay', name: 'VNPay', icon: 'bi-globe' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFacilityChange = (facilityId) => {
    setBookingData(prev => ({
      ...prev,
      facility: facilityId,
      doctor: ''
    }));
  };

  // Tính tổng số tiền cần thanh toán
  const calculateTotalAmount = () => {
    let total = bookingFee;
    
    if (bookingData.facility) {
      const facility = facilities.find(f => f.id === parseInt(bookingData.facility));
      if (facility) {
        total += facility.baseFee;
      }
    }
    
    if (bookingData.doctor) {
      const doctor = doctors.find(d => d.id === parseInt(bookingData.doctor));
      if (doctor) {
        total += doctor.additionalFee;
      }
    }
    
    return total;
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra validate
    if (!bookingData.patientName || !bookingData.phoneNumber || !bookingData.date || !bookingData.time || !bookingData.facility) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }

    // Tạo mã booking
    const newBookingCode = 'BK-' + Date.now().toString().slice(-8);
    setBookingCode(newBookingCode);
    setShowBookingModal(true);
  };

  // Hàm xác nhận đặt lịch và chuyển sang thanh toán
  const handleConfirmBooking = () => {
    setShowBookingModal(false);
    setShowPaymentModal(true);
    setPaymentStep(1);
  };

  // Hàm xử lý chọn phương thức thanh toán
  const handleSelectPaymentMethod = (methodId) => {
    setPaymentMethod(methodId);
    setPaymentStep(2);
  };

  // Hàm xử lý thay đổi thông tin thanh toán
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Hàm xử lý thanh toán
  const handlePaymentSubmit = async () => {
    if (!isPaymentInfoValid()) {
      alert('Vui lòng điền đầy đủ thông tin thanh toán');
      return;
    }

    setIsProcessing(true);
    
    // Mô phỏng quá trình thanh toán (3 giây)
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);

      // Lưu thông tin booking vào localStorage hoặc gửi lên server
      const bookingInfo = {
        ...bookingData,
        bookingCode,
        paymentAmount: 50000,
        paymentMethod,
        paymentData,
        paymentStatus: 'completed',
        bookingStatus: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Lưu vào localStorage (trong thực tế sẽ gửi lên API)
      const existingBookings = JSON.parse(localStorage.getItem('medicalBookings') || '[]');
      existingBookings.push(bookingInfo);
      localStorage.setItem('medicalBookings', JSON.stringify(existingBookings));
      
      // Gửi email/SMS xác nhận (mô phỏng)
      console.log('Thanh toán thành công!', bookingInfo);
      
    }, 3000);
  };


  // Lọc bác sĩ theo cơ sở đã chọn
  const filteredDoctors = bookingData.facility 
    ? doctors.filter(doctor => doctor.facility === parseInt(bookingData.facility))
    : [];

  // Tính ngày hôm nay và ngày trong vòng 30 ngày
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowBookingModal(false);
    // Reset form
    setBookingData({
      patientName: '',
      phoneNumber: '',
      email: '',
      date: '',
      time: '',
      facility: '',
      doctor: '',
      specialty: '',
      symptoms: '',
      notes: '',
      insurance: 'none',
      isReturningPatient: false
    });
    setPaymentMethod('');
    setPaymentData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      bankCode: '',
      accountNumber: ''
    });
  };

  // Hàm quay về trang chủ
  const handleGoHome = () => {
    navigate('/');
  };

  // Hàm kiểm tra thông tin thanh toán có hợp lệ không
  const isPaymentInfoValid = () => {
    switch (paymentMethod) {
      case 'momo':
      case 'zalopay':
        return paymentData.phone && paymentData.phone.length >= 10;
      case 'bank_transfer':
        return paymentData.accountNumber && paymentData.bankName;
      case 'credit_card':
        return paymentData.cardNumber && paymentData.expiryDate && paymentData.cvv && paymentData.cardHolder;
      case 'vnpay':
        return true; // VNPay chỉ cần chọn ngân hàng hoặc quét QR
      default:
        return false;
    }
  };


  // Hàm định dạng tiền VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="online-booking-page">
      <div className="container">
        <div className="online-booking">
          <div className="booking-header">
            <h2><i className="bi bi-calendar-check"></i> Đặt Lịch Khám Trực Tuyến</h2>
            <p className="subtitle">Đặt lịch nhanh chóng, tiện lợi với vài bước đơn giản</p>
            <div className="payment-notice">
              <i className="bi bi-info-circle"></i>
              <span> Lưu ý: Cần thanh toán phí đặt chỗ {formatCurrency(bookingFee)} để xác nhận lịch hẹn</span>
            </div>
          </div>

          <div className="booking-steps">
            <div className="step active">
              <div className="step-number">1</div>
              <div className="step-text">Thông tin bệnh nhân</div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-text">Chọn cơ sở & bác sĩ</div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-text">Chọn thời gian</div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-text">Thanh toán</div>
            </div>
          </div>

          {/* Hiển thị thông tin phí */}
          {bookingData.facility && (
            <div className="fee-summary">
              <div className="fee-item">
                <span>Phí đặt chỗ:</span>
                <strong>{formatCurrency(bookingFee)}</strong>
              </div>
              {bookingData.facility && (
                <div className="fee-item">
                  <span>Phí cơ sở:</span>
                  <strong>{formatCurrency(facilities.find(f => f.id === parseInt(bookingData.facility))?.baseFee || 0)}</strong>
                </div>
              )}
              {bookingData.doctor && (
                <div className="fee-item">
                  <span>Phí bác sĩ:</span>
                  <strong>{formatCurrency(doctors.find(d => d.id === parseInt(bookingData.doctor))?.additionalFee || 0)}</strong>
                </div>
              )}
              <div className="fee-total">
                <span>Tổng cộng:</span>
                <strong className="text-primary">{formatCurrency(calculateTotalAmount())}</strong>
              </div>
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Phí đặt chỗ sẽ không được hoàn lại nếu hủy lịch trước 24h
              </small>
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form">
            {/* Phần 1: Thông tin bệnh nhân */}
            <div className="form-section">
              <div className="section-header">
                <i className="bi bi-person-circle"></i>
                <h4>Thông Tin Bệnh Nhân</h4>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="patientName">
                      <i className="bi bi-person"></i> Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      className="form-control"
                      placeholder="Nhập họ và tên đầy đủ"
                      value={bookingData.patientName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">
                      <i className="bi bi-telephone"></i> Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Nhập số điện thoại liên hệ"
                      value={bookingData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="bi bi-envelope"></i> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="email@example.com"
                      value={bookingData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="insurance">
                      <i className="bi bi-shield-check"></i> Bảo hiểm
                    </label>
                    <select
                      id="insurance"
                      name="insurance"
                      className="form-select"
                      value={bookingData.insurance}
                      onChange={handleChange}
                    >
                      {insuranceOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="isReturningPatient"
                  name="isReturningPatient"
                  className="form-check-input"
                  checked={bookingData.isReturningPatient}
                  onChange={handleChange}
                />
                <label htmlFor="isReturningPatient" className="form-check-label">
                  Tôi là bệnh nhân cũ của cơ sở này
                </label>
              </div>
            </div>

            {/* Phần 2: Chọn cơ sở y tế & bác sĩ */}
            <div className="form-section">
              <div className="section-header">
                <i className="bi bi-hospital"></i>
                <h4>Chọn Cơ Sở Y Tế & Bác Sĩ</h4>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="bi bi-geo-alt"></i> Chọn cơ sở y tế *
                </label>
                <div className="facilities-grid">
                  {facilities.map(facility => (
                    <div
                      key={facility.id}
                      className={`facility-card ${bookingData.facility === facility.id.toString() ? 'selected' : ''}`}
                      onClick={() => handleFacilityChange(facility.id)}
                    >
                      <div className="facility-icon">
                        <i className={`bi ${facility.type === 'hospital' ? 'bi-hospital' : 'bi-clipboard-pulse'}`}></i>
                      </div>
                      <div className="facility-info">
                        <div className="facility-name">{facility.name}</div>
                        <div className="facility-type">
                          {facility.type === 'hospital' ? 'Bệnh viện' : 
                          facility.type === 'clinic' ? 'Phòng khám' : 'Trung tâm y tế'}
                        </div>
                      </div>
                      {bookingData.facility === facility.id.toString() && (
                        <div className="selected-check">
                          <i className="bi bi-check-circle-fill"></i>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {bookingData.facility && (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="specialty">
                          <i className="bi bi-bandaid"></i> Chuyên khoa
                        </label>
                        <select
                          id="specialty"
                          name="specialty"
                          className="form-select"
                          value={bookingData.specialty}
                          onChange={handleChange}
                        >
                          <option value="">Chọn chuyên khoa (không bắt buộc)</option>
                          {specialties.map((specialty, index) => (
                            <option key={index} value={specialty}>{specialty}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="doctor">
                          <i className="bi bi-person-badge"></i> Chọn bác sĩ
                        </label>
                        <select
                          id="doctor"
                          name="doctor"
                          className="form-select"
                          value={bookingData.doctor}
                          onChange={handleChange}
                        >
                          <option value="">Chọn bác sĩ (không bắt buộc)</option>
                          {filteredDoctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty}
                            </option>
                          ))}
                        </select>
                        {!filteredDoctors.length && bookingData.facility && (
                          <small className="text-muted d-block mt-1">Vui lòng chọn cơ sở để xem danh sách bác sĩ</small>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Phần 3: Chọn thời gian khám */}
            <div className="form-section">
              <div className="section-header">
                <i className="bi bi-calendar-week"></i>
                <h4>Chọn Thời Gian Khám</h4>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">
                      <i className="bi bi-calendar-date"></i> Ngày khám *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={bookingData.date}
                      onChange={handleChange}
                      min={today}
                      max={maxDateStr}
                      required
                    />
                    <small className="text-muted d-block mt-1">Có thể đặt lịch trong vòng 30 ngày tới</small>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="time">
                      <i className="bi bi-clock"></i> Khung giờ *
                    </label>
                    <div className="time-slots">
                      {timeSlots.map((time, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`time-slot ${bookingData.time === time ? 'selected' : ''}`}
                          onClick={() => setBookingData(prev => ({ ...prev, time }))}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {bookingData.time && (
                      <div className="selected-time mt-2">
                        <span>Đã chọn: </span>
                        <strong>{bookingData.time}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Phần 4: Thông tin bổ sung */}
            <div className="form-section">
              <div className="section-header">
                <i className="bi bi-clipboard-plus"></i>
                <h4>Thông Tin Bổ Sung</h4>
              </div>

              <div className="form-group">
                <label htmlFor="symptoms">
                  <i className="bi bi-heart-pulse"></i> Triệu chứng / Lý do khám
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  className="form-control"
                  placeholder="Mô tả các triệu chứng bạn đang gặp phải..."
                  rows="3"
                  value={bookingData.symptoms}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">
                  <i className="bi bi-chat-left-text"></i> Ghi chú thêm (nếu có)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-control"
                  placeholder="Ghi chú hoặc yêu cầu đặc biệt..."
                  rows="2"
                  value={bookingData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Ghi chú đặt lịch */}
            <div className="booking-notes">
              <div className="note-item">
                <i className="bi bi-info-circle"></i>
                <span>Vui lòng đến trước 15 phút để làm thủ tục</span>
              </div>
              <div className="note-item">
                <i className="bi bi-info-circle"></i>
                <span>Mang theo CMND/CCCD và thẻ bảo hiểm (nếu có)</span>
              </div>
              <div className="note-item">
                <i className="bi bi-info-circle"></i>
                <span>Có thể hủy lịch trước 24h miễn phí</span>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={handleGoHome}
              >
                <i className="bi bi-arrow-left"></i> Quay lại trang chủ
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-calendar-check"></i> Tiếp tục đến thanh toán
              </button>
            </div>
          </form>

          {/* Thông tin bổ sung */}
          <div className="booking-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-clock-history"></i>
              </div>
              <div className="info-content">
                <h5>Lịch hẹn của bạn</h5>
                <p>Quản lý và xem lịch sử đặt lịch dễ dàng</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-bell"></i>
              </div>
              <div className="info-content">
                <h5>Nhắc lịch thông minh</h5>
                <p>Nhận thông báo SMS và email trước cuộc hẹn</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="info-content">
                <h5>Bảo mật thông tin</h5>
                <p>Thông tin cá nhân được mã hóa và bảo vệ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Đặt Lịch Thành Công */}
{showBookingModal && (
  <div className="booking-success-modal">
    <div className="modal-overlay" onClick={handleCloseModal}></div>
    
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">
          <i className="bi bi-check-circle-fill text-success me-2"></i>
          Xác Nhận Thông Tin Đặt Lịch
        </h5>
        <button 
          type="button" 
          className="btn-close" 
          onClick={handleCloseModal}
        ></button>
      </div>
      
      <div className="modal-body">
        <div className="booking-confirmation-card">
          {!isConfirmed ? (
            /* Trạng thái chưa thanh toán */
            <>
              <div className="success-icon">
                <i className="bi bi-credit-card" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
              </div>
              
              <h4 className="text-center mb-4">Xác Nhận Đặt Lịch & Thanh Toán</h4>
              
              <div className="confirmation-details">
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-ticket-detailed"></i>
                    Mã đặt lịch:
                  </div>
                  <div className="confirmation-value">
                    <strong className="booking-code">{bookingCode}</strong>
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-building"></i>
                    Cơ sở y tế:
                  </div>
                  <div className="confirmation-value">
                    {facilities.find(f => f.id === parseInt(bookingData.facility))?.name}
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-person"></i>
                    Bệnh nhân:
                  </div>
                  <div className="confirmation-value">
                    {bookingData.patientName}
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-calendar"></i>
                    Ngày khám:
                  </div>
                  <div className="confirmation-value">
                    {bookingData.date}
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-clock"></i>
                    Giờ khám:
                  </div>
                  <div className="confirmation-value">
                    {bookingData.time}
                  </div>
                </div>
                
                {bookingData.doctor && (
                  <div className="confirmation-row">
                    <div className="confirmation-label">
                      <i className="bi bi-person-badge"></i>
                      Bác sĩ:
                    </div>
                    <div className="confirmation-value">
                      {doctors.find(d => d.id === parseInt(bookingData.doctor))?.name}
                    </div>
                  </div>
                )}
                
                {/* Thông tin thanh toán */}
                <div className="confirmation-row" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '6px', marginTop: '15px' }}>
                  <div className="confirmation-label">
                    <i className="bi bi-cash-coin" style={{ color: '#198754' }}></i>
                    Phí đặt chỗ:
                  </div>
                  <div className="confirmation-value">
                    <strong style={{ color: '#198754' }}>50,000 VND</strong>
                  </div>
                </div>
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-currency-exchange"></i>
                    Tổng thanh toán:
                  </div>
                  <div className="confirmation-value">
                    <strong style={{ fontSize: '1.2em', color: '#0d6efd' }}>
                      50.000 VNĐ
                    </strong>
                  </div>
                </div>
              </div>

              {/* Phần chọn và nhập thông tin thanh toán */}
              <div className="confirmation-notes mt-4" style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '15px' }}>
                <h6><i className="bi bi-credit-card me-2"></i>Phương thức thanh toán:</h6>
                
                {/* Bước 1: Chọn phương thức thanh toán */}
                {!paymentMethod ? (
                  <div style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        style={{ flex: '1', minWidth: '120px' }}
                        onClick={() => setPaymentMethod('momo')}
                      >
                        <i className="bi bi-phone"></i> MoMo
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        style={{ flex: '1', minWidth: '120px' }}
                        onClick={() => setPaymentMethod('zalopay')}
                      >
                        <i className="bi bi-chat-left"></i> ZaloPay
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        style={{ flex: '1', minWidth: '120px' }}
                        onClick={() => setPaymentMethod('vnpay')}
                      >
                        <i className="bi bi-globe"></i> VNPay
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        style={{ flex: '1', minWidth: '140px' }}
                        onClick={() => setPaymentMethod('bank_transfer')}
                      >
                        <i className="bi bi-bank"></i> Chuyển khoản
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-outline-warning"
                        style={{ flex: '1', minWidth: '140px' }}
                        onClick={() => setPaymentMethod('credit_card')}
                      >
                        <i className="bi bi-credit-card"></i> Thẻ tín dụng
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Bước 2: Nhập thông tin thanh toán theo phương thức đã chọn */
                  <div style={{ marginTop: '15px' }}>
                    {/* Nút quay lại chọn phương thức */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm mb-3"
                      onClick={() => setPaymentMethod('')}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <i className="bi bi-arrow-left"></i> Chọn phương thức khác
                    </button>
                    
                    {/* Form thông tin thanh toán */}
                    {paymentMethod === 'momo' && (
                      <div>
                        <div className="mb-3">
                          <label className="form-label">Số điện thoại MoMo:</label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="0909 123 456"
                            value={paymentData.phone}
                            onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                          />
                          <small className="text-muted">Nhập số điện thoại đã đăng ký MoMo</small>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Họ và tên (trong MoMo):</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="NGUYEN VAN A"
                            value={paymentData.name}
                            onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'zalopay' && (
                      <div>
                        <div className="mb-3">
                          <label className="form-label">Số điện thoại ZaloPay:</label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="0909 123 456"
                            value={paymentData.phone}
                            onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                          />
                          <small className="text-muted">Nhập số điện thoại đã đăng ký ZaloPay</small>
                        </div>
                        
                        <div className="text-center mb-3">
                          <div style={{ 
                            background: '#f8f9fa', 
                            padding: '20px', 
                            borderRadius: '8px',
                            border: '1px solid #dee2e6'
                          }}>
                            <i className="bi bi-qr-code" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                            <p className="mt-2 mb-1">Hoặc quét mã QR để thanh toán</p>
                            <small className="text-muted">Mở ZaloPay → Quét mã</small>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'vnpay' && (
                      <div>
                        <div className="text-center mb-3">
                          <div style={{ 
                            background: '#f8f9fa', 
                            padding: '20px', 
                            borderRadius: '8px',
                            border: '1px solid #dee2e6'
                          }}>
                            <i className="bi bi-qr-code" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                            <p className="mt-2 mb-1">Quét mã QR để thanh toán qua VNPay</p>
                            <small className="text-muted">Mở ứng dụng ngân hàng và quét mã</small>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Chọn ngân hàng:</label>
                          <select 
                            className="form-select"
                            value={paymentData.bank}
                            onChange={(e) => setPaymentData({...paymentData, bank: e.target.value})}
                          >
                            <option value="">Chọn ngân hàng</option>
                            <option value="vcb">Vietcombank</option>
                            <option value="bidv">BIDV</option>
                            <option value="vpb">VPBank</option>
                            <option value="tcb">Techcombank</option>
                            <option value="mbb">MB Bank</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'bank_transfer' && (
                      <div>
                        <div style={{ 
                          background: '#f8f9fa', 
                          padding: '15px', 
                          borderRadius: '8px',
                          border: '1px solid #dee2e6',
                          marginBottom: '15px'
                        }}>
                          <h6 style={{ fontSize: '0.9rem' }}>Thông tin chuyển khoản:</h6>
                          <div style={{ fontSize: '0.85rem' }}>
                            <div><strong>Ngân hàng:</strong> Techcombank</div>
                            <div><strong>Số tài khoản:</strong> 1903 6666 8888</div>
                            <div><strong>Chủ tài khoản:</strong> CÔNG TY Y TẾ MEDICARE</div>
                            <div><strong>Số tiền:</strong> 50.000 VNĐ</div>
                            <div><strong>Nội dung:</strong> {bookingCode} - {bookingData.patientName}</div>
                          </div>
                          <small className="text-muted d-block mt-2">
                            Vui lòng chuyển khoản với đúng nội dung để hệ thống tự động xác nhận
                          </small>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Số tài khoản của bạn:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập số tài khoản"
                            value={paymentData.accountNumber}
                            onChange={(e) => setPaymentData({...paymentData, accountNumber: e.target.value})}
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Ngân hàng:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Techcombank, Vietcombank, ..."
                            value={paymentData.bankName}
                            onChange={(e) => setPaymentData({...paymentData, bankName: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'credit_card' && (
                      <div>
                        <div className="mb-3">
                          <label className="form-label">Số thẻ:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                          />
                        </div>
                        
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Ngày hết hạn:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="MM/YY"
                              maxLength="5"
                              value={paymentData.expiryDate}
                              onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">CVV:</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="123"
                              maxLength="3"
                              value={paymentData.cvv}
                              onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Tên chủ thẻ:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="NGUYEN VAN A"
                            value={paymentData.cardHolder}
                            onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Nút xác nhận thanh toán */}
                    <button
                      type="button"
                      className="btn btn-primary w-100 mt-3"
                      onClick={handlePaymentSubmit}
                      disabled={isProcessing || !isPaymentInfoValid()}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Đang xử lý thanh toán...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Xác nhận thanh toán 50.000 VNĐ
                        </>
                      )}
                    </button>
                    
                    {isProcessing && (
                      <div className="text-center mt-2">
                        <small className="text-muted">
                          <i className="bi bi-shield-lock me-1"></i>
                          Đang kết nối đến cổng thanh toán an toàn...
                        </small>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="confirmation-notes mt-4">
                <h6><i className="bi bi-info-circle me-2"></i>Lưu ý quan trọng:</h6>
                <ul>
                  <li><strong>Lịch hẹn chỉ được xác nhận sau khi thanh toán thành công</strong></li>
                  <li>Phí đặt chỗ 50.000 VNĐ sẽ được hoàn 100% nếu hủy trước 48h</li>
                  <li>Phí đặt chỗ không bao gồm chi phí khám bệnh thực tế</li>
                  <li>Vui lòng đến trước 15 phút để làm thủ tục</li>
                  <li>Mang theo CMND/CCCD và thẻ bảo hiểm (nếu có)</li>
                  <li>Mang theo mã đặt lịch ({bookingCode}) khi đến khám</li>
                </ul>
              </div>
            </>
          ) : (
            /* Trạng thái đã thanh toán thành công */
            <>
              <div className="success-icon">
                <i className="bi bi-check-circle" style={{ color: '#198754', fontSize: '4rem' }}></i>
              </div>
              
              <h4 className="text-center mb-4" style={{ color: '#198754' }}>Thanh Toán Thành Công!</h4>
              
              <div className="confirmation-details">
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-ticket-detailed"></i>
                    Mã đặt lịch:
                  </div>
                  <div className="confirmation-value">
                    <strong className="booking-code">{bookingCode}</strong>
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-cash-coin"></i>
                    Số tiền đã thanh toán:
                  </div>
                  <div className="confirmation-value">
                    <strong style={{ color: '#198754' }}>
                      50.000 VNĐ
                    </strong>
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-credit-card"></i>
                    Phương thức:
                  </div>
                  <div className="confirmation-value">
                    <strong>
                      {paymentMethod === 'momo' && 'Ví MoMo'}
                      {paymentMethod === 'zalopay' && 'ZaloPay'}
                      {paymentMethod === 'vnpay' && 'VNPay'}
                      {paymentMethod === 'bank_transfer' && 'Chuyển khoản ngân hàng'}
                      {paymentMethod === 'credit_card' && 'Thẻ tín dụng/ghi nợ'}
                    </strong>
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-building"></i>
                    Cơ sở y tế:
                  </div>
                  <div className="confirmation-value">
                    {facilities.find(f => f.id === parseInt(bookingData.facility))?.name}
                  </div>
                </div>
                
                <div className="confirmation-row">
                  <div className="confirmation-label">
                    <i className="bi bi-calendar"></i>
                    Ngày & giờ khám:
                  </div>
                  <div className="confirmation-value">
                    <strong>{bookingData.date} - {bookingData.time}</strong>
                  </div>
                </div>
              </div>
              
              <div className="confirmation-notes mt-4" style={{ backgroundColor: '#d1e7dd', borderColor: '#badbcc', color: '#0f5132', padding: '15px', borderRadius: '6px' }}>
                <h6><i className="bi bi-check-circle me-2"></i>Đặt lịch thành công!</h6>
                <ul style={{ marginBottom: '0' }}>
                  <li>Thông tin lịch hẹn đã được gửi qua SMS/Email</li>
                  <li>Vui lòng kiểm tra email để xem chi tiết</li>
                  <li>Đến trước 15 phút để làm thủ tục</li>
                  <li>Mang theo mã đặt lịch khi đến khám</li>
                  <li>Liên hệ hotline 1900 1234 nếu cần hỗ trợ</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
            
          <div className="modal-footer">
                  {!isConfirmed ? (
                    <>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={handleCloseModal}
                        disabled={isProcessing}
                      >
                        <i className="bi bi-x-circle me-2"></i>Hủy
                      </button>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <small className="text-muted">
                          <i className="bi bi-lock me-1"></i>
                          Thanh toán an toàn - Bảo mật SSL
                        </small>
                      </div>
                    </>
                  ) : (
                    <button 
                      type="button" 
                      className="btn btn-success"
                      onClick={handleCloseModal}
                      style={{ width: '100%' }}
                    >
                      <i className="bi bi-check-circle me-2"></i>Hoàn tất
                    </button>
                  )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineBookingPage;