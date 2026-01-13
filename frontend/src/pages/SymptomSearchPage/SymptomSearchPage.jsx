import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SymptomSearchPage.css';

const SymptomSearchPage = () => {
  const [symptoms, setSymptoms] = useState('');
  const [symptomSuggestions, setSymptomSuggestions] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [showAIReco, setShowAIReco] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [relatedSymptoms, setRelatedSymptoms] = useState([]);
  const [healthTips, setHealthTips] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Cơ sở dữ liệu triệu chứng và thông tin sức khỏe
  const symptomDatabase = {
    'Sốt cao': {
      description: 'Nhiệt độ cơ thể trên 38°C',
      emergencyLevel: 'medium',
      specialty: 'Nội tổng quát, Nhi khoa, Truyền nhiễm',
      possibleCauses: [
        'Nhiễm virus (cảm cúm, sốt xuất huyết)',
        'Nhiễm khuẩn (viêm phổi, viêm họng)',
        'Bệnh tự miễn',
        'Tác dụng phụ thuốc'
      ],
      selfCare: [
        'Uống nhiều nước (2-3 lít/ngày)',
        'Nghỉ ngơi đầy đủ',
        'Mặc quần áo thoáng mát',
        'Chườm ấm vùng trán, nách, bẹn'
      ],
      whenToSeekHelp: [
        'Sốt trên 39.5°C',
        'Sốt kéo dài trên 3 ngày',
        'Co giật, lơ mơ',
        'Khó thở, đau ngực'
      ],
      related: ['Ớn lạnh', 'Đau đầu', 'Mệt mỏi', 'Đau cơ']
    },
    'Đau đầu': {
      description: 'Cảm giác đau ở vùng đầu, có nhiều loại và mức độ',
      emergencyLevel: 'low',
      specialty: 'Thần kinh, Nội tổng quát',
      possibleCauses: [
        'Căng thẳng, stress',
        'Thiếu ngủ',
        'Đau nửa đầu (Migraine)',
        'Tăng huyết áp',
        'Viêm xoang'
      ],
      selfCare: [
        'Nghỉ ngơi trong phòng yên tĩnh, tối',
        'Massage thái dương nhẹ nhàng',
        'Uống đủ nước',
        'Chườm lạnh vùng trán'
      ],
      whenToSeekHelp: [
        'Đau đầu đột ngột, dữ dội',
        'Đau đầu kèm sốt cao, cứng cổ',
        'Nhìn mờ, nói khó',
        'Sau chấn thương đầu'
      ],
      related: ['Chóng mặt', 'Buồn nôn', 'Nhạy cảm ánh sáng', 'Mệt mỏi']
    },
    'Ho kéo dài': {
      description: 'Ho liên tục trên 3 tuần',
      emergencyLevel: 'low',
      specialty: 'Hô hấp, Tai Mũi Họng',
      possibleCauses: [
        'Viêm phế quản mãn',
        'Hen suyễn',
        'Trào ngược dạ dày',
        'Dị ứng',
        'Viêm xoang'
      ],
      selfCare: [
        'Uống nước ấm với mật ong',
        'Súc miệng nước muối',
        'Tránh khói thuốc, bụi',
        'Dùng máy tạo độ ẩm'
      ],
      whenToSeekHelp: [
        'Ho ra máu',
        'Khó thở, thở khò khè',
        'Sốt cao kèm ho',
        'Sút cân không rõ nguyên nhân'
      ],
      related: ['Đau họng', 'Khàn tiếng', 'Tức ngực', 'Sổ mũi']
    },
    'Khó thở': {
      description: 'Cảm giác không lấy đủ không khí',
      emergencyLevel: 'high',
      specialty: 'Hô hấp, Tim mạch, Cấp cứu',
      possibleCauses: [
        'Hen suyễn',
        'Viêm phổi',
        'Suy tim',
        'Thiếu máu',
        'Lo âu, hoảng loạn'
      ],
      selfCare: [
        'Ngồi thẳng, hơi ngả người về phía trước',
        'Hít thở chậm và sâu',
        'Tránh gắng sức',
        'Giữ môi trường thông thoáng'
      ],
      whenToSeekHelp: [
        'Khó thở đột ngột, dữ dội',
        'Môi, đầu ngón tay tím tái',
        'Đau ngực dữ dội',
        'Không nói được thành câu'
      ],
      related: ['Đau ngực', 'Tim đập nhanh', 'Choáng váng', 'Ho']
    },
    'Đau bụng': {
      description: 'Cơn đau ở vùng bụng với nhiều tính chất khác nhau',
      emergencyLevel: 'medium',
      specialty: 'Tiêu hóa, Ngoại khoa',
      possibleCauses: [
        'Viêm dạ dày',
        'Viêm ruột thừa',
        'Sỏi mật',
        'Hội chứng ruột kích thích',
        'Ngộ độc thực phẩm'
      ],
      selfCare: [
        'Nhịn ăn tạm thời nếu đau dữ dội',
        'Uống nước ấm từng ngụm nhỏ',
        'Nghỉ ngơi, tránh vận động mạnh',
        'Chườm ấm vùng bụng'
      ],
      whenToSeekHelp: [
        'Đau bụng dữ dội, đau quặn',
        'Nôn ra máu, đi ngoài phân đen',
        'Bụng cứng như gỗ',
        'Sốt cao kèm đau bụng'
      ],
      related: ['Buồn nôn', 'Tiêu chảy', 'Đầy hơi', 'Ợ chua']
    },
    'Đau ngực': {
      description: 'Cảm giác đau, tức, ép ở vùng ngực',
      emergencyLevel: 'high',
      specialty: 'Tim mạch, Hô hấp, Cấp cứu',
      possibleCauses: [
        'Nhồi máu cơ tim',
        'Viêm phổi',
        'Trào ngược dạ dày',
        'Viêm màng phổi',
        'Căng cơ ngực'
      ],
      selfCare: [
        'Nghỉ ngơi ngay lập tức',
        'Ngồi ở tư thế thoải mái',
        'Hít thở chậm và sâu',
        'Tránh căng thẳng'
      ],
      whenToSeekHelp: [
        'Đau ngực dữ dội, lan ra tay, hàm',
        'Khó thở, vã mồ hôi',
        'Choáng váng, ngất xỉu',
        'Đau kéo dài trên 15 phút'
      ],
      related: ['Khó thở', 'Tim đập nhanh', 'Vã mồ hôi', 'Buồn nôn']
    },
    'Tiêu chảy': {
      description: 'Đi ngoài phân lỏng trên 3 lần/ngày',
      emergencyLevel: 'medium',
      specialty: 'Tiêu hóa, Nhiễm trùng',
      possibleCauses: [
        'Ngộ độc thực phẩm',
        'Nhiễm virus Rota',
        'Hội chứng ruột kích thích',
        'Không dung nạp lactose',
        'Tác dụng phụ thuốc'
      ],
      selfCare: [
        'Uống oresol bù nước và điện giải',
        'Ăn thức ăn dễ tiêu: cháo, súp',
        'Tránh thức ăn dầu mỡ, cay',
        'Nghỉ ngơi đầy đủ'
      ],
      whenToSeekHelp: [
        'Tiêu chảy trên 10 lần/ngày',
        'Phân có máu, nhầy',
        'Mất nước nặng: khô miệng, ít tiểu',
        'Sốt cao trên 39°C'
      ],
      related: ['Đau bụng', 'Buồn nôn', 'Mệt mỏi', 'Chán ăn']
    }
  };

  // Các triệu chứng phổ biến cho gợi ý
  const commonSymptoms = [
    'Sốt cao', 'Đau đầu', 'Ho kéo dài', 'Khó thở', 
    'Đau bụng', 'Đau ngực', 'Tiêu chảy'
  ];

  useEffect(() => {
    if (location.state?.symptom) {
      handleSymptomSelect(location.state.symptom);
    }
  }, [location.state]);

  const handleSymptomSearch = (e) => {
    const value = e.target.value;
    setSymptoms(value);

    if (value.length > 1) {
      const filtered = commonSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(value.toLowerCase())
      );
      setSymptomSuggestions(filtered);
    } else {
      setSymptomSuggestions([]);
    }
  };

  const handleSymptomSelect = (symptom) => {
    setSymptoms(symptom);
    setSymptomSuggestions([]);
    setSelectedSymptom(symptom);
    
    // Tải thông tin liên quan
    if (symptomDatabase[symptom]) {
      setRelatedSymptoms(symptomDatabase[symptom].related || []);
      setHealthTips(symptomDatabase[symptom].selfCare || []);
    }
  };

  const getAIAnalysis = (symptom) => {
    setLoadingAI(true);
    
    // Giả lập thời gian phân tích AI
    setTimeout(() => {
      const data = symptomDatabase[symptom];
      if (!data) {
        setAiInsights(null);
        setLoadingAI(false);
        return;
      }

      // Phân tích AI dựa trên triệu chứng
      const aiAnalysis = {
        symptom: symptom,
        description: data.description,
        emergencyAssessment: `Mức độ khẩn cấp: ${data.emergencyLevel === 'high' ? 'Cao - Cần khám ngay' : 
                          data.emergencyLevel === 'medium' ? 'Trung bình - Khám trong 24h' : 
                          'Thấp - Có thể theo dõi'}`,
        recommendedSpecialties: data.specialty,
        probableCauses: data.possibleCauses.slice(0, 3),
        riskLevel: calculateRiskLevel(data.emergencyLevel),
        nextSteps: [
          data.emergencyLevel === 'high' ? 'Đến cơ sở y tế ngay lập tức' : 
          data.emergencyLevel === 'medium' ? 'Đặt lịch khám trong ngày' : 
          'Theo dõi và đặt lịch nếu không cải thiện',
          'Chuẩn bị mô tả triệu chứng chi tiết',
          'Theo dõi các dấu hiệu cảnh báo'
        ],
        warningSigns: data.whenToSeekHelp || []
      };

      setAiInsights(aiAnalysis);
      setLoadingAI(false);
      setShowAIReco(true);
    }, 1500);
  };

  const calculateRiskLevel = (emergencyLevel) => {
    switch (emergencyLevel) {
      case 'high': return { level: 'Cao', color: '#dc3545', icon: 'exclamation-triangle' };
      case 'medium': return { level: 'Trung bình', color: '#ffc107', icon: 'exclamation-circle' };
      case 'low': return { level: 'Thấp', color: '#28a745', icon: 'info-circle' };
      default: return { level: 'Không xác định', color: '#6c757d', icon: 'question-circle' };
    }
  };

  const handleFindFacilities = () => {
    if (!selectedSymptom) return;

    const data = symptomDatabase[selectedSymptom];
    navigate('/symptom-results', {
      state: {
        symptom: selectedSymptom,
        suggestedSpecialty: data?.specialty?.split(', ')[0] || 'Nội tổng quát',
        emergencyLevel: data?.emergencyLevel || 'low',
        searchTime: new Date().toISOString(),
        aiInsights: aiInsights
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && symptoms.trim()) {
      handleSymptomSelect(symptoms);
    }
  };

  return (
    <div className="symptom-search-page">
      <div className="container">
        
        {/* Header */}
        <div className="page-header text-center mb-5">
          <h1 className="page-title">
            <i className="bi bi-search-heart me-2"></i>
            Tìm Kiếm Theo Triệu Chứng
          </h1>
          <p className="page-subtitle">
            Nhập triệu chứng để nhận khuyến nghị từ AI và tìm cơ sở y tế phù hợp
          </p>
        </div>

        {/* Main Search Card */}
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body p-4 p-md-5">
            <div className="search-box">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-primary text-white border-0">
                  <i className="bi bi-heart-pulse fs-4"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-3"
                  placeholder="Nhập triệu chứng của bạn (ví dụ: sốt cao, đau đầu, khó thở)..."
                  value={symptoms}
                  onChange={handleSymptomSearch}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
                <button
                  className="btn btn-primary px-4"
                  onClick={() => symptoms.trim() && handleSymptomSelect(symptoms)}
                  disabled={!symptoms.trim()}
                >
                  <i className="bi bi-search me-2"></i> Tìm kiếm
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {symptomSuggestions.length > 0 && (
                <div className="suggestions-dropdown mt-3">
                  <div className="dropdown-header text-muted small mb-2">Gợi ý triệu chứng:</div>
                  <div className="dropdown-items">
                    {symptomSuggestions.map((symptom, index) => (
                      <button
                        key={index}
                        className="dropdown-item py-2"
                        onClick={() => handleSymptomSelect(symptom)}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>{symptom}</span>
                          <span className="badge bg-light text-primary">
                            <i className="bi bi-arrow-right"></i>
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Symptom & AI Analysis */}
        {selectedSymptom && (
          <div className="selected-symptom-section mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-clipboard-check me-2 text-primary"></i>
                    Triệu chứng đã chọn: <span className="text-primary">{selectedSymptom}</span>
                  </h5>
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      setSelectedSymptom(null);
                      setSymptoms('');
                      setAiInsights(null);
                    }}
                  >
                    <i className="bi bi-x me-1"></i> Chọn lại
                  </button>
                </div>
              </div>
              
              <div className="card-body">
                {/* Basic Symptom Info */}
                {symptomDatabase[selectedSymptom] && (
                  <div className="symptom-basic-info mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="info-item mb-3">
                          <h6><i className="bi bi-info-circle me-2"></i>Mô tả:</h6>
                          <p className="mb-0 text-muted">{symptomDatabase[selectedSymptom].description}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="info-item mb-3">
                          <h6><i className="bi bi-heart-pulse me-2"></i>Chuyên khoa liên quan:</h6>
                          <p className="mb-0">{symptomDatabase[selectedSymptom].specialty}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons mb-4">
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-primary btn-lg flex-fill"
                      onClick={() => getAIAnalysis(selectedSymptom)}
                      disabled={loadingAI}
                    >
                      {loadingAI ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Đang phân tích...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-robot me-2"></i>
                          Nhận khuyến nghị từ AI
                        </>
                      )}
                    </button>
                    
                    <button
                      className="btn btn-success btn-lg flex-fill"
                      onClick={handleFindFacilities}
                    >
                      <i className="bi bi-hospital me-2"></i>
                      Tìm cơ sở y tế phù hợp
                    </button>
                  </div>
                </div>

                {/* Related Symptoms */}
                {relatedSymptoms.length > 0 && (
                  <div className="related-symptoms mb-4">
                    <h6><i className="bi bi-link me-2"></i>Triệu chứng thường đi kèm:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {relatedSymptoms.map((symptom, index) => (
                        <button
                          key={index}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleSymptomSelect(symptom)}
                        >
                          {symptom}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Health Tips */}
                {healthTips.length > 0 && (
                  <div className="health-tips">
                    <h6><i className="bi bi-lightbulb me-2 text-warning"></i>Chăm sóc tại nhà:</h6>
                    <div className="list-group">
                      {healthTips.map((tip, index) => (
                        <div key={index} className="list-group-item border-0">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Symptoms Grid */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-white border-0 py-3">
            <h5 className="mb-0">
              <i className="bi bi-lightning me-2 text-warning"></i>
              Triệu chứng thường gặp - Chọn nhanh
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {commonSymptoms.map((symptom, index) => {
                const data = symptomDatabase[symptom];
                const riskLevel = data ? calculateRiskLevel(data.emergencyLevel) : { level: 'Không xác định', color: '#6c757d' };
                              
                return (
                  <div key={index} className="col-md-4 col-sm-6">
                    <button
                      className="quick-symptom-btn w-100 text-start"
                      onClick={() => handleSymptomSelect(symptom)}
                      style={{ borderLeft: `4px solid ${riskLevel.color}` }}
                    >
                      <div className="d-flex align-items-center">
                        <div className="symptom-icon me-3">
                          <i className={`bi bi-${riskLevel.icon}`} style={{ color: riskLevel.color }}></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="symptom-name fw-medium">{symptom}</div>
                          <div className="symptom-category small text-muted">
                            {data?.specialty?.split(', ')[0] || 'Nội tổng quát'}
                          </div>
                        </div>
                        <div 
                          className="risk-badge" 
                          style={{ 
                            backgroundColor: `${riskLevel.color}20`, 
                            color: riskLevel.color,
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                          {riskLevel.level}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h6><i className="bi bi-shield-check me-2 text-success"></i>Tại sao dùng AI phân tích?</h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Phân tích dựa trên cơ sở dữ liệu y học</li>
                  <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Đánh giá mức độ khẩn cấp chính xác</li>
                  <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Gợi ý chuyên khoa phù hợp</li>
                  <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Cung cấp thông tin chăm sóc tại nhà</li>
                  <li><i className="bi bi-check-circle text-success me-2"></i>Hướng dẫn khi nào cần đi khám</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h6><i className="bi bi-exclamation-triangle me-2 text-danger"></i>Khi nào cần đi cấp cứu ngay?</h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="bi bi-x-circle text-danger me-2"></i>Khó thở dữ dội, tím tái môi</li>
                  <li className="mb-2"><i className="bi bi-x-circle text-danger me-2"></i>Đau ngực lan ra tay, hàm</li>
                  <li className="mb-2"><i className="bi bi-x-circle text-danger me-2"></i>Co giật, mất ý thức</li>
                  <li className="mb-2"><i className="bi bi-x-circle text-danger me-2"></i>Chảy máu không cầm được</li>
                  <li><i className="bi bi-x-circle text-danger me-2"></i>Ngộ độc, tai nạn nghiêm trọng</li>
                </ul>
                <div className="alert alert-danger mt-3 mb-0">
                  <i className="bi bi-telephone me-2"></i>
                  <strong>Gọi cấp cứu 115</strong> ngay khi có dấu hiệu nguy hiểm
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* AI Recommendation Modal */}
      {showAIReco && aiInsights && (
        <div className="ai-recommendation-modal">
          <div className="modal-overlay" onClick={() => setShowAIReco(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-robot me-2"></i>
                Khuyến nghị từ AI về: {aiInsights.symptom}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowAIReco(false)}
              ></button>
            </div>
            
            <div className="modal-body">
              <div className="ai-insights">
                
                {/* Emergency Assessment */}
                <div className="insight-section mb-4">
                  <h6><i className="bi bi-exclamation-triangle me-2"></i>Đánh giá khẩn cấp</h6>
                  <div className={`alert ${aiInsights.riskLevel.level === 'Cao' ? 'alert-danger' : 
                    aiInsights.riskLevel.level === 'Trung bình' ? 'alert-warning' : 'alert-success'}`}>
                    <i className={`bi bi-${aiInsights.riskLevel.icon} me-2`}></i>
                    {aiInsights.emergencyAssessment}
                  </div>
                </div>

                {/* Recommended Specialties */}
                <div className="insight-section mb-4">
                  <h6><i className="bi bi-heart-pulse me-2"></i>Chuyên khoa đề xuất</h6>
                  <div className="specialties-list">
                    {aiInsights.recommendedSpecialties.split(', ').map((specialty, index) => (
                      <span key={index} className="badge bg-primary me-2 mb-2">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Probable Causes */}
                <div className="insight-section mb-4">
                  <h6><i className="bi bi-clipboard-data me-2"></i>Nguyên nhân có thể</h6>
                  <ul className="list-group">
                    {aiInsights.probableCauses.map((cause, index) => (
                      <li key={index} className="list-group-item border-0">
                        <i className="bi bi-dot me-2"></i>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="insight-section mb-4">
                  <h6><i className="bi bi-signpost me-2"></i>Bước tiếp theo</h6>
                  <div className="list-group">
                    {aiInsights.nextSteps.map((step, index) => (
                      <div key={index} className="list-group-item border-0">
                        <div className="d-flex">
                          <div className="step-number me-3">{index + 1}</div>
                          <div>{step}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning Signs */}
                {aiInsights.warningSigns.length > 0 && (
                  <div className="insight-section">
                    <h6><i className="bi bi-bell me-2 text-danger"></i>Dấu hiệu cảnh báo - Cần đi khám ngay</h6>
                    <div className="alert alert-danger">
                      <ul className="mb-0">
                        {aiInsights.warningSigns.map((sign, index) => (
                          <li key={index}>{sign}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowAIReco(false)}
              >
                <i className="bi bi-x-circle me-2"></i>Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomSearchPage;