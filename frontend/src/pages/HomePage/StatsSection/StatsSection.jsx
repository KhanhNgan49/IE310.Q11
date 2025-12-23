import React, { useEffect, useState } from 'react';
import './StatsSection.css';

import facilityService from '../../../services/facilityService';
import pharmacyService from '../../../services/pharmacyService';
import provinceService from '../../../services/provinceService';
import userService from '../../../services/userService';

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm định dạng số: nếu số quá lớn sẽ viết tắt K (nghìn) và M (triệu)
  const formatNumber = (num) => {
    if (typeof num !== 'number') {
      // Nếu không phải số, thử chuyển đổi
      const parsedNum = parseInt(num);
      if (isNaN(parsedNum)) return num;
      num = parsedNum;
    }

    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace('.0', '')}M+`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace('.0', '')}K+`;
    }
    return num.toLocaleString();
  };

  // Fetch dữ liệu thống kê từ API
useEffect(() => {
  const fetchStatsData = async () => {
    try {
      setLoading(true);
      
      // Gọi các API để lấy tất cả đối tượng
      const [
        medicalFacilitiesRes,
        pharmaciesRes,
        provincesRes,
        usersRes
      ] = await Promise.all([
        facilityService.getAllFacilities(),
        pharmacyService.getAllPharmacies(),
        provinceService.getAllProvinces(),
        userService.getAllUsers()
      ]);

      // Lấy dữ liệu từ response
      const facilitiesData = medicalFacilitiesRes|| [];
      const pharmaciesData = pharmaciesRes|| [];
      const provincesData = provincesRes || [];
      const usersData = usersRes || [];

      // Lọc người dùng không phải admin
      const nonAdminUsers = usersData.filter(user => {
        // Kiểm tra role có tồn tại và không phải admin
        const userRole = user.role?.toLowerCase() || '';
        return !['admin', 'administrator', 'superadmin'].includes(userRole);
      });

      // Kiểm tra dữ liệu trước khi hiển thị
      if (facilitiesData.length === 0 && pharmaciesData.length === 0 && 
          provincesData.length === 0 && nonAdminUsers.length === 0) {
        console.warn('Tất cả dữ liệu đều trống, có thể API chưa có dữ liệu');
      }

      // Tạo mảng stats với nhãn và số liệu đã định dạng
      const formattedStats = [
        {
          icon: 'bi bi-hospital',
          number: formatNumber(facilitiesData.length),
          label: 'Cơ sở Y tế',
          description: 'Trên toàn quốc',
          rawCount: facilitiesData.length
        },
        {
          icon: 'bi bi-capsule',
          number: formatNumber(pharmaciesData.length),
          label: 'Nhà thuốc',
          description: 'Phân bố rộng khắp đất nước',
          rawCount: pharmaciesData.length
        },
        {
          icon: 'bi bi-people',
          number: formatNumber(nonAdminUsers.length),
          label: 'Người dùng',
          description: 'Tin tưởng sử dụng',
          rawCount: nonAdminUsers.length
        },
        {
          icon: 'bi bi-geo-alt',
          number: formatNumber(provincesData.length),
          label: 'Tỉnh thành',
          description: 'Được phủ sóng',
          rawCount: provincesData.length
        }
      ];

      setStats(formattedStats);
      setError(null);
    } catch (err) {
      console.error('❌ Lỗi khi tải dữ liệu thống kê:', err);
      setError(err.message);
      
      // Fallback data khi API lỗi
    } finally {
      setLoading(false);
    }
  };

  fetchStatsData();
}, []);

  if (loading) {
    return (
      <section className="stats-section section section-light">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Đang tải...</span>
            </div>
            <p className="mt-3">Đang tải thống kê...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="stats-section section section-light">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Thống Kê Y Tế</h2>
              <p className="section-subtitle">
                Cập nhật số liệu mới nhất về hệ thống y tế quốc gia
              </p>
            </div>
          </div>
        </div>

        {/* Main Stats - chỉ còn 4 thẻ thống kê */}
        <div className="row">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="stat-card">
                <div className="stat-icon-wrapper">
                  <i className={stat.icon}></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stat.number}</h3>
                  <h6 className="stat-label">{stat.label}</h6>
                  <p className="stat-description">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Hiển thị lỗi nếu có */}
        {error && (
          <div className="row mt-3">
            <div className="col-12">
              <div className="alert alert-warning text-center">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Có lỗi khi tải dữ liệu: {error}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;