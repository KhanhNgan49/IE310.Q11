import React from 'react';
import './QuickActions.css';

const QuickActions = () => {
  const quickActions = [
    {
      icon: 'bi bi-plus-circle',
      title: 'Thêm cơ sở y tế',
      description: 'Thêm mới bệnh viện, phòng khám',
      color: '#3498db',
      action: '/facilities/add'
    },
    {
      icon: 'bi bi-virus',
      title: 'Khai báo vùng dịch',
      description: 'Xác định khu vực có dịch bệnh',
      color: '#e74c3c',
      action: '/outbreak/add'
    },
    {
      icon: 'bi bi-clipboard-data',
      title: 'Tạo báo cáo',
      description: 'Xuất báo cáo thống kê',
      color: '#9b59b6',
      action: '/reports/create'
    },
    {
      icon: 'bi bi-geo-alt',
      title: 'Quét khu vực',
      description: 'Kiểm tra cơ sở y tế theo khu vực',
      color: '#27ae60',
      action: '/scan'
    },
    {
      icon: 'bi bi-bell',
      title: 'Gửi cảnh báo',
      description: 'Thông báo khẩn cấp đến người dân',
      color: '#f39c12',
      action: '/alerts'
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Kiểm tra hệ thống',
      description: 'Đánh giá an toàn hệ thống',
      color: '#2c3e50',
      action: '/security'
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: 'Xác minh BV Đa khoa X',
      priority: 'high',
      dueDate: 'Hôm nay',
      completed: false
    },
    {
      id: 2,
      title: 'Cập nhật số liệu dịch',
      priority: 'medium',
      dueDate: '2 ngày nữa',
      completed: false
    },
    {
      id: 3,
      title: 'Kiểm kê thiết bị y tế',
      priority: 'low',
      dueDate: '1 tuần nữa',
      completed: true
    }
  ];

  const handleActionClick = (action) => {
    console.log('Action clicked:', action);
    // Xử lý điều hướng hoặc hành động
  };

  return (
    <div className="quick-actions">
      {/* Quick Actions Grid */}
      <div className="actions-section">
        <h5>Hành Động Nhanh</h5>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="action-card"
              onClick={() => handleActionClick(action.action)}
              style={{ '--action-color': action.color }}
            >
              <div className="action-icon">
                <i className={action.icon}></i>
              </div>
              <div className="action-content">
                <h6>{action.title}</h6>
                <p>{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="tasks-section">
        <div className="tasks-header">
          <h5>Công Việc Gần Đây</h5>
          <span className="tasks-count">{recentTasks.filter(t => !t.completed).length}</span>
        </div>
        <div className="tasks-list">
          {recentTasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-checkbox">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  readOnly
                />
              </div>
              <div className="task-content">
                <span className="task-title">{task.title}</span>
                <div className="task-meta">
                  <span className={`task-priority ${task.priority}`}>
                    {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </span>
                  <span className="task-due">{task.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-outline-primary btn-sm w-100 mt-2">
          Xem tất cả công việc
        </button>
      </div>

      {/* System Status */}
      <div className="system-status">
        <h5>Trạng Thái Hệ Thống</h5>
        <div className="status-list">
          <div className="status-item online">
            <i className="bi bi-check-circle-fill"></i>
            <span>Dịch vụ chính</span>
          </div>
          <div className="status-item online">
            <i className="bi bi-check-circle-fill"></i>
            <span>Cơ sở dữ liệu</span>
          </div>
          <div className="status-item warning">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>API bên ngoài</span>
          </div>
          <div className="status-item online">
            <i className="bi bi-check-circle-fill"></i>
            <span>Bản đồ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;