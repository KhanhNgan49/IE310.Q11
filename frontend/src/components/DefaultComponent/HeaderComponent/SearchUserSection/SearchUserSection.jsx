import React, { useState } from 'react';
import './SearchUserSection.css';

const SearchUserSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm ở đây
    console.log('Searching for:', searchQuery);
    // Gọi API tìm kiếm hoặc chuyển hướng đến trang kết quả
  };

  return (
    <div className="d-flex align-items-center">
      {/* Ô tìm kiếm */}
      <div className="search-container me-3">
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="Tìm kiếm bệnh viện, địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-light btn-sm" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Thông tin user */}
      <div className="dropdown">
        <button 
          className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center" 
          type="button" 
          data-bs-toggle="dropdown"
        >
          <div className="user-avatar me-2">
            <i className="bi bi-person-fill"></i>
          </div>
          <span>Đăng nhập</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="/login">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Đăng nhập
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/register">
              <i className="bi bi-person-plus me-2"></i>
              Đăng ký
            </a>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <a className="dropdown-item" href="/admin">
              <i className="bi bi-gear me-2"></i>
              Quản trị
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchUserSection;