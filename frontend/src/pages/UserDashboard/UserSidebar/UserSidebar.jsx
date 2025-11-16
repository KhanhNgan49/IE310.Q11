import React from 'react';
import './UserSidebar.css';
import LogoImage from '../../../assets/Logo/LogoImage.png';

const UserSidebar = ({ activeSection, setActiveSection, collapsed }) => {
  const menuItems = [
    {
      id: 'dashboard',
      icon: 'bi bi-speedometer2',
      label: 'Tổng quan',
      badge: null
    },
    {
      id: 'facilities',
      icon: 'bi bi-hospital',
      label: 'Cơ sở y tế',
      badge: '12'
    },
    {
      id: 'outbreak',
      icon: 'bi bi-virus',
      label: 'Quản lý dịch',
      badge: '3'
    },
    {
      id: 'reports',
      icon: 'bi bi-graph-up',
      label: 'Báo cáo',
      badge: null
    },
    {
      id: 'users',
      icon: 'bi bi-people',
      label: 'Người dùng',
      badge: null
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      icon: 'bi bi-gear',
      label: 'Cài đặt'
    },
    {
      id: 'help',
      icon: 'bi bi-question-circle',
      label: 'Trợ giúp'
    },
    {
      id: 'logout',
      icon: 'bi bi-box-arrow-right',
      label: 'Đăng xuất'
    }
  ];

  return (
    <div className={`user-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={LogoImage} alt="Logo" className="logo-img" />
          {!collapsed && (
            <div className="logo-text">
              <span className="logo-title">BẢN ĐỒ Y TẾ</span>
              <small className="logo-subtitle">Quản trị</small>
            </div>
          )}
        </div>
      </div>

      {/* Main Menu */}
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <div className="menu-icon">
              <i className={item.icon}></i>
            </div>
            {!collapsed && (
              <>
                <span className="menu-label">{item.label}</span>
                {item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Menu */}
      <div className="sidebar-bottom">
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <div className="menu-icon">
              <i className={item.icon}></i>
            </div>
            {!collapsed && (
              <span className="menu-label">{item.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="sidebar-user">
          <div className="user-avatar">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="user-info">
            <div className="user-name">Nguyễn Văn A</div>
            <div className="user-role">Cán bộ y tế</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;