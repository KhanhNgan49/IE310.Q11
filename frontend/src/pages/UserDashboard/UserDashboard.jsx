import React, { useState } from 'react';
import './UserDashboard.css';
import UserSidebar from './UserSidebar/UserSidebar';
import UserHeader from './UserHeader/UserHeader';
import DashboardStats from './DashboardStats/DashboardStats';
import MedicalFacilities from './MedicalFacilities/MedicalFacilities';
import OutbreakManagement from './OutbreakManagement/OutbreakManagement';
import QuickActions from './QuickActions/QuickActions';
import RecentActivity from './RecentActivity/RecentActivity';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <DashboardStats />
            <div className="row mt-4">
              <div className="col-lg-8">
                <RecentActivity />
              </div>
              <div className="col-lg-4">
                <QuickActions />
              </div>
            </div>
          </>
        );
      case 'facilities':
        return <MedicalFacilities />;
      case 'outbreak':
        return <OutbreakManagement />;
      case 'reports':
        return <div className="section-placeholder">Trang Báo Cáo - Đang phát triển</div>;
      case 'users':
        return <div className="section-placeholder">Quản lý Người dùng - Đang phát triển</div>;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <UserSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <UserHeader 
          toggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        {/* Page Content */}
        <div className="content-area">
          <div className="container-fluid">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;