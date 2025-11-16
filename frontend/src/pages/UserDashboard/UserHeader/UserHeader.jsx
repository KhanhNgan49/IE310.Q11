import React, { useState } from 'react';
import './UserHeader.css';

const UserHeader = ({ toggleSidebar, sidebarCollapsed }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Có báo cáo dịch mới',
      message: 'Báo cáo dịch sốt xuất huyết tại quận Ba Đình',
      time: '5 phút trước',
      read: false,
      type: 'outbreak'
    },
    {
      id: 2,
      title: 'Yêu cầu xác minh',
      message: 'Cơ sở y tế mới cần xác minh thông tin',
      time: '1 giờ trước',
      read: false,
      type: 'facility'
    },
    {
      id: 3,
      title: 'Cập nhật hệ thống',
      message: 'Phiên bản mới 2.1.0 đã sẵn sàng',
      time: '2 giờ trước',
      read: true,
      type: 'system'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  return (
    <header className="user-header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col">
            {/* Sidebar Toggle */}
            <button 
              className="btn sidebar-toggle"
              onClick={toggleSidebar}
            >
              <i className={`bi ${sidebarCollapsed ? 'bi-list' : 'bi-layout-sidebar'}`}></i>
            </button>

            {/* Breadcrumb */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">
                    <i className="bi bi-house me-1"></i>
                    Trang chủ
                  </a>
                </li>
                <li className="breadcrumb-item active">Bảng điều khiển</li>
              </ol>
            </nav>
          </div>

          <div className="col-auto">
            <div className="header-actions">
              {/* Search */}
              <div className="search-box me-3">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Tìm kiếm..." />
              </div>

              {/* Notifications */}
              <div className="dropdown notification-dropdown">
                <button 
                  className="btn notification-btn"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-bell"></i>
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>
                <div className="dropdown-menu dropdown-menu-end notification-menu">
                  <div className="notification-header">
                    <h6>Thông báo</h6>
                    {unreadCount > 0 && (
                      <button 
                        className="btn btn-sm btn-link"
                        onClick={markAllAsRead}
                      >
                        Đánh dấu đã đọc
                      </button>
                    )}
                  </div>
                  <div className="notification-list">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className={`notification-icon ${notification.type}`}>
                          <i className={`bi bi-${
                            notification.type === 'outbreak' ? 'virus' : 
                            notification.type === 'facility' ? 'hospital' : 'gear'
                          }`}></i>
                        </div>
                        <div className="notification-content">
                          <h6>{notification.title}</h6>
                          <p>{notification.message}</p>
                          <small>{notification.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="notification-footer">
                    <a href="/notifications" className="btn btn-sm btn-outline-primary w-100">
                      Xem tất cả
                    </a>
                  </div>
                </div>
              </div>

              {/* User Menu */}
              <div className="dropdown user-dropdown">
                <button 
                  className="btn user-btn"
                  data-bs-toggle="dropdown"
                >
                  <div className="user-avatar-sm">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <span className="user-name">Nguyễn Văn A</span>
                  <i className="bi bi-chevron-down"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end user-menu">
                  <a className="dropdown-item" href="/profile">
                    <i className="bi bi-person me-2"></i>
                    Hồ sơ cá nhân
                  </a>
                  <a className="dropdown-item" href="/settings">
                    <i className="bi bi-gear me-2"></i>
                    Cài đặt
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-danger" href="/logout">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Đăng xuất
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;