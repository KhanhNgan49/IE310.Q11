import React, { useState } from 'react';
import './MapSearch.css';

const MapSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const commonSymptoms = [
    'Sốt cao', 'Ho kéo dài', 'Đau bụng', 'Đau đầu', 
    'Khó thở', 'Dị ứng', 'Tiêu chảy', 'Đau lưng',
    'Mất ngủ', 'Căng thẳng', 'Khám sức khỏe tổng quát'
  ];

  const commonSpecialties = [
    'Tim mạch', 'Nội khoa', 'Ngoại khoa', 'Sản phụ khoa',
    'Nhi khoa', 'Da liễu', 'Răng hàm mặt', 'Mắt',
    'Tai mũi họng', 'Cơ xương khớp', 'Thần kinh'
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const filteredSuggestions = [
        ...commonSymptoms.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        ),
        ...commonSpecialties.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        )
      ].slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleQuickSearch = (quickQuery) => {
    setQuery(quickQuery);
    onSearch(quickQuery);
  };

  return (
    <div className="map-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo triệu chứng, chuyên khoa hoặc tên cơ sở..."
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary search-btn">
            Tìm kiếm
          </button>
        </div>

        {/* Quick Search Buttons */}
        <div className="quick-search">
          <span className="quick-search-label">Tìm nhanh:</span>
          <div className="quick-search-buttons">
            <button 
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleQuickSearch('Cấp cứu')}
            >
              <i className="bi bi-lightning-fill me-1"></i>
              Cấp cứu
            </button>
            <button 
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleQuickSearch('Khám tổng quát')}
            >
              <i className="bi bi-heart-pulse me-1"></i>
              Khám tổng quát
            </button>
            <button 
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleQuickSearch('Tiêm chủng')}
            >
              <i className="bi bi-shield-plus me-1"></i>
              Tiêm chủng
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <i className="bi bi-search me-2"></i>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default MapSearch;