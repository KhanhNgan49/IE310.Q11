import React from 'react';
import './DashboardStats.css';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Tổng Cơ Sở Y Tế',
      value: '1,247',
      change: '+12',
      changeType: 'up',
      icon: 'bi bi-hospital',
      color: '#3498db',
      description: 'Đang hoạt động'
    },
    {
      title: 'Vùng Dịch Đang Hoạt Động',
      value: '23',
      change: '-3',
      changeType: 'down',
      icon: 'bi bi-virus',
      color: '#e74c3c',
      description: 'Cần theo dõi'
    },
    {
      title: 'Báo Cáo Mới',
      value: '47',
      change: '+8',
      changeType: 'up',
      icon: 'bi bi-clipboard-data',
      color: '#9b59b6',
      description: 'Trong 24h qua'
    },
    {
      title: 'Người Dùng Truy Cập',
      value: '2,458',
      change: '+124',
      changeType: 'up',
      icon: 'bi bi-people',
      color: '#27ae60',
      description: 'Hôm nay'
    }
  ];

  // const chartData = {
  //   facilities: [120, 190, 300, 500, 200, 300, 450, 600, 750, 800, 900, 1247],
  //   outbreaks: [45, 52, 38, 24, 33, 28, 35, 40, 32, 28, 25, 23]
  // };

  return (
    <div className="dashboard-stats">
      <div className="row">
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <div key={index} className="col-xl-3 col-lg-6 mb-4">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <h6 className="stat-title">{stat.title}</h6>
                <div className="stat-meta">
                  <span className={`change ${stat.changeType}`}>
                    <i className={`bi bi-arrow-${stat.changeType}`}></i>
                    {stat.change}
                  </span>
                  <span className="description">{stat.description}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="chart-card">
            <div className="chart-header">
              <h5>Thống Kê Phát Triển Hệ Thống</h5>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color facilities"></div>
                  <span>Cơ sở y tế</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color outbreaks"></div>
                  <span>Vùng dịch</span>
                </div>
              </div>
            </div>
            <div className="chart-placeholder">
              <div className="placeholder-content">
                <i className="bi bi-bar-chart"></i>
                <p>Biểu đồ thống kê sẽ được hiển thị tại đây</p>
                <small>Dữ liệu cập nhật theo thời gian thực</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="quick-stats-card">
            <h5>Hoạt Động Nổi Bật</h5>
            <div className="quick-stats-list">
              <div className="quick-stat-item">
                <div className="stat-indicator primary"></div>
                <div className="stat-info">
                  <span className="stat-label">Cơ sở chờ duyệt</span>
                  <span className="stat-value">12</span>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="stat-indicator warning"></div>
                <div className="stat-info">
                  <span className="stat-label">Báo cáo chưa xử lý</span>
                  <span className="stat-value">8</span>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="stat-indicator danger"></div>
                <div className="stat-info">
                  <span className="stat-label">Cảnh báo dịch</span>
                  <span className="stat-value">3</span>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="stat-indicator success"></div>
                <div className="stat-info">
                  <span className="stat-label">Đã xử lý hôm nay</span>
                  <span className="stat-value">24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;