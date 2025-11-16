import React from 'react';
import './RecentActivity.css';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      action: 'added_facility',
      target: 'Bệnh viện Đa khoa Quốc tế',
      time: '2 phút trước',
      icon: 'bi bi-hospital',
      color: '#3498db'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      action: 'updated_outbreak',
      target: 'Dịch sốt xuất huyết Ba Đình',
      time: '15 phút trước',
      icon: 'bi bi-virus',
      color: '#e74c3c'
    },
    {
      id: 3,
      user: 'Lê Văn C',
      action: 'verified_facility',
      target: 'Phòng khám Đa khoa XYZ',
      time: '1 giờ trước',
      icon: 'bi bi-check-circle',
      color: '#27ae60'
    },
    {
      id: 4,
      user: 'Phạm Thị D',
      action: 'created_report',
      target: 'Báo cáo tuần 2 tháng 1',
      time: '2 giờ trước',
      icon: 'bi bi-clipboard-data',
      color: '#9b59b6'
    },
    {
      id: 5,
      user: 'Hoàng Văn E',
      action: 'sent_alert',
      target: 'Cảnh báo dịch cúm',
      time: '3 giờ trước',
      icon: 'bi bi-bell',
      color: '#f39c12'
    }
  ];

  const getActionText = (action) => {
    const actionTexts = {
      added_facility: 'đã thêm cơ sở y tế',
      updated_outbreak: 'đã cập nhật vùng dịch',
      verified_facility: 'đã xác minh cơ sở y tế',
      created_report: 'đã tạo báo cáo',
      sent_alert: 'đã gửi cảnh báo'
    };
    return actionTexts[action] || 'đã thực hiện hành động';
  };

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h5>Hoạt Động Gần Đây</h5>
        <button className="btn btn-sm btn-outline-primary">
          Xem tất cả
        </button>
      </div>

      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: `${activity.color}20`, color: activity.color }}>
              <i className={activity.icon}></i>
            </div>
            <div className="activity-content">
              <div className="activity-text">
                <strong>{activity.user}</strong> {getActionText(activity.action)}
                <span className="activity-target"> {activity.target}</span>
              </div>
              <div className="activity-time">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Chart */}
      <div className="activity-stats">
        <h6>Thống Kê Hoạt Động</h6>
        <div className="stats-bars">
          <div className="stat-bar">
            <div className="bar-label">
              <span>Thêm cơ sở</span>
              <span>12</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '60%', backgroundColor: '#3498db' }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <div className="bar-label">
              <span>Cập nhật dịch</span>
              <span>8</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '40%', backgroundColor: '#e74c3c' }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <div className="bar-label">
              <span>Xác minh</span>
              <span>15</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '75%', backgroundColor: '#27ae60' }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <div className="bar-label">
              <span>Báo cáo</span>
              <span>5</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: '25%', backgroundColor: '#9b59b6' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;