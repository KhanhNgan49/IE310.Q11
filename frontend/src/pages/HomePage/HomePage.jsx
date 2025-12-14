import React, { useState } from 'react';
import './HomePage.css';
import HeroSection from './HeroSection/HeroSection';
import SearchSection from './SearchSection/SearchSection';
import StatsSection from './StatsSection/StatsSection';
import ServicesSection from './ServicesSection/ServicesSection';
import EmergencyContacts from './EmergencyContacts/EmergencyContacts';

// Import các chức năng 
import SymptomSearch from './SymptomSearch/SymptomSearch';
import NearbyFacilities from './NearbyFacilities/NearbyFacilities';
import OnlineBooking from './OnlineBooking/OnlineBooking';
import AdvancedFilters from './AdvancedFilters/AdvancedFilters';

const HomePage = () => {
  // State chung cho hệ thống
  const [symptoms, setSymptoms] = useState('');
  const [filters, setFilters] = useState({
    province: '',
    insurance: '',
    priceRange: 'all',
    specialty: '',
    workingHours: 'all',
    rating: 0
  });

  // Hàm xử lý tìm kiếm triệu chứng
  const handleSymptomSearch = (searchTerm, suggestedSpecialty) => {
    setSymptoms(searchTerm);
    if (suggestedSpecialty) {
      setFilters(prev => ({ ...prev, specialty: suggestedSpecialty }));
    }
    console.log('Tìm kiếm triệu chứng:', searchTerm);
  };

  // Hàm thay đổi bộ lọc
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // Hàm xóa bộ lọc
  const handleClearFilters = () => {
    setFilters({
      province: '',
      insurance: '',
      priceRange: 'all',
      specialty: '',
      workingHours: 'all',
      rating: 0
    });
  };

  // Hàm đặt lịch
  const handleBookAppointment = (facilityId) => {
    alert(`Đang chuyển đến trang đặt lịch cho cơ sở ID: ${facilityId}`);
  };

  // Hàm xem chi tiết cơ sở
  const handleViewDetails = (facilityId) => {
    alert(`Xem chi tiết cơ sở ID: ${facilityId}`);
  };

  return (
    <div className="home-page">
      {/* Hero Banner với tìm kiếm */}
      <HeroSection />

      {/* Section 1: Tìm kiếm theo triệu chứng & Bộ lọc nâng cao */}
      <section className="section section-light">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-8">
              <div className="symptom-search-wrapper">
                <h2 className="section-title text-center mb-4">
                  <i className="bi bi-search-heart me-2"></i>
                  Tìm kiếm theo triệu chứng
                </h2>
                <SymptomSearch
                  onSearch={handleSymptomSearch}
                  onSymptomSelect={handleSymptomSearch}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <AdvancedFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Cơ sở y tế gần nhất */}
      <section className="section section-gray">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-12">
              <div className="section-header">
                <h2 className="section-title">
                  <i className="bi bi-hospital me-2"></i>
                  Cơ sở y tế gần bạn nhất
                </h2>
              </div>
              <NearbyFacilities
                facilities={[]}
                onBookAppointment={handleBookAppointment}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Đặt lịch khám trực tuyến */}
      <section className="section section-light" id="online-booking">
        <div className="container">
          <OnlineBooking />
        </div>
      </section>

      {/* Section 4: Tìm kiếm nâng cao */}
      <section className="section section-gray">
        <div className="container">
          <SearchSection />
        </div>
      </section>

      {/* Section 5: Thống kê y tế */}
      <section className="section section-light">
        <div className="container">
          <StatsSection />
        </div>
      </section>

      {/* Section 6: Dịch vụ y tế */}
    {/*
      <section className="section section-gray">
        <div className="container">
          <ServicesSection />
        </div>
      </section> 
    */}

      {/* Section 7: Liên hệ khẩn cấp */}
      <section className="section section-primary">
        <div className="container">
          <EmergencyContacts />
        </div>
      </section>
    </div>
  );
};

export default HomePage;