import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SymptomSearch.css';

const SymptomSearch = ({ onSymptomSelect }) => {
  const [symptoms, setSymptoms] = useState('');
  const [symptomSuggestions, setSymptomSuggestions] = useState([]);
  const navigate = useNavigate();

  const symptomOptions = [
    'Sốt cao', 'Đau đầu', 'Ho kéo dài', 'Đau bụng', 'Khó thở',
    'Chóng mặt', 'Buồn nôn', 'Đau họng', 'Mệt mỏi', 'Đau ngực',
    'Sổ mũi', 'Đau cơ', 'Tiêu chảy', 'Phát ban', 'Mất vị giác',
    'Mất khứu giác', 'Đau lưng', 'Đau khớp', 'Hoa mắt', 'Ù tai'
  ];

  // Ánh xạ triệu chứng -> chuyên khoa
  const symptomToSpecialty = {
    'Sốt cao': 'Nội tổng quát',
    'Đau đầu': 'Thần kinh',
    'Ho kéo dài': 'Hô hấp',
    'Đau bụng': 'Tiêu hóa',
    'Khó thở': 'Hô hấp',
    'Chóng mặt': 'Thần kinh',
    'Buồn nôn': 'Tiêu hóa',
    'Đau họng': 'Tai Mũi Họng',
    'Mệt mỏi': 'Nội tổng quát',
    'Đau ngực': 'Tim mạch',
    'Sổ mũi': 'Tai Mũi Họng',
    'Đau cơ': 'Cơ Xương Khớp',
    'Tiêu chảy': 'Tiêu hóa',
    'Phát ban': 'Da liễu',
    'Mất vị giác': 'Tai Mũi Họng',
    'Mất khứu giác': 'Tai Mũi Họng',
    'Đau lưng': 'Cơ Xương Khớp',
    'Đau khớp': 'Cơ Xương Khớp',
    'Hoa mắt': 'Thần kinh',
    'Ù tai': 'Tai Mũi Họng'
  };

  // Ánh xạ triệu chứng -> cấp độ khẩn cấp
  const symptomToEmergency = {
    'Sốt cao': 'medium',
    'Đau đầu': 'low',
    'Ho kéo dài': 'low',
    'Đau bụng': 'medium',
    'Khó thở': 'high',
    'Chóng mặt': 'low',
    'Buồn nôn': 'low',
    'Đau họng': 'low',
    'Mệt mỏi': 'low',
    'Đau ngực': 'high',
    'Sổ mũi': 'low',
    'Đau cơ': 'low',
    'Tiêu chảy': 'medium',
    'Phát ban': 'low',
    'Mất vị giác': 'low',
    'Mất khứu giác': 'low',
    'Đau lưng': 'low',
    'Đau khớp': 'low',
    'Hoa mắt': 'low',
    'Ù tai': 'low'
  };

  const handleSymptomSearch = (e) => {
    const value = e.target.value;
    setSymptoms(value);

    if (value.length > 1) {
      const filtered = symptomOptions.filter(symptom =>
        symptom.toLowerCase().includes(value.toLowerCase())
      );
      setSymptomSuggestions(filtered);
    } else {
      setSymptomSuggestions([]);
    }
  };

  const handleSymptomSelection = (symptom) => {
    setSymptoms(symptom);
    setSymptomSuggestions([]);

    // Gợi ý chuyên khoa dựa trên triệu chứng
    const suggestedSpecialty = symptomToSpecialty[symptom] || 'Nội tổng quát';
    const emergencyLevel = symptomToEmergency[symptom] || 'low';

    if (onSymptomSelect) {
      onSymptomSelect(symptom, suggestedSpecialty);
    }

    // Điều hướng đến trang kết quả
    navigate('/symptom-results', {
      state: {
        symptom,
        suggestedSpecialty,
        emergencyLevel,
        searchTime: new Date().toISOString()
      }
    });
  };

  const handleSubmit = () => {
    if (symptoms.trim()) {
      const suggestedSpecialty = symptomToSpecialty[symptoms] || 'Nội tổng quát';
      const emergencyLevel = symptomToEmergency[symptoms] || 'low';

      navigate('/symptom-results', {
        state: {
          symptom: symptoms,
          suggestedSpecialty,
          emergencyLevel,
          searchTime: new Date().toISOString()
        }
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="symptom-search-section card">
      <div className="card-body">
        


        <div className="symptom-search">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-heart-pulse"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập triệu chứng của bạn (ví dụ: sốt cao, đau đầu)..."
              value={symptoms}
              onChange={handleSymptomSearch}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!symptoms.trim()}
            >
              <i className="bi bi-search"></i> Tìm kiếm
            </button>
          </div>

          {symptomSuggestions.length > 0 && (
            <div className="symptom-suggestions">
              <div className="suggestion-header">Gợi ý triệu chứng:</div>
              <div className="suggestion-tags">
                {symptomSuggestions.map((symptom, index) => (
                  <button
                    key={index}
                    className="suggestion-tag"
                    onClick={() => handleSymptomSelection(symptom)}
                  >
                    <span className="symptom-text">{symptom}</span>
                    <span className="specialty-hint">
                      {symptomToSpecialty[symptom] || 'Nội tổng quát'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="common-symptoms">
            <div className="suggestion-header">Triệu chứng thường gặp:</div>
            <div className="common-symptoms-grid">
              {symptomOptions.slice(0, 8).map((symptom, index) => {
                const emergencyLevel = symptomToEmergency[symptom];
                const emergencyClass = `emergency-${emergencyLevel}`;

                return (
                  <button
                    key={index}
                    className={`common-symptom-btn ${emergencyClass}`}
                    onClick={() => handleSymptomSelection(symptom)}
                  >
                    <div className="symptom-icon">
                      {emergencyLevel === 'high' && <i className="bi bi-exclamation-triangle"></i>}
                      {emergencyLevel === 'medium' && <i className="bi bi-exclamation-circle"></i>}
                      {emergencyLevel === 'low' && <i className="bi bi-info-circle"></i>}
                    </div>
                    <div className="symptom-content">
                      <div className="symptom-name">{symptom}</div>
                      <div className="symptom-specialty">
                        {symptomToSpecialty[symptom] || 'Nội tổng quát'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="emergency-guide mt-4">
            <div className="guide-header">
              <i className="bi bi-info-circle"></i>
              <span>Hướng dẫn cấp độ khẩn cấp:</span>
            </div>
            <div className="guide-items">
              <div className="guide-item">
                <span className="emergency-dot high"></span>
                <span>Cấp độ cao: Cần khám ngay</span>
              </div>
              <div className="guide-item">
                <span className="emergency-dot medium"></span>
                <span>Cấp độ trung bình: Khám trong ngày</span>
              </div>
              <div className="guide-item">
                <span className="emergency-dot low"></span>
                <span>Cấp độ thấp: Có thể đặt lịch sau</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomSearch;