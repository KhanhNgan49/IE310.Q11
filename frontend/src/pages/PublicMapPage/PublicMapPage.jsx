import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix cho icon marker trong React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function MapView() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tạo các icon tùy chỉnh cho từng loại đối tượng
  const customIcons = {
    // Icon cho pharmacy
    pharmacy: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    
    // Icon cho medical facility
    medical_facility: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    
    // Icon mặc định cho các location khác
    default: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    })
  };

  // Hàm lấy icon dựa trên loại đối tượng
  const getIconByType = (type) => {
    return customIcons[type] || customIcons.default;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Gọi song song 3 API
        const [locationsRes, pharmaciesRes, medicalFacilitiesRes] = await Promise.all([
          fetch("http://localhost:3001/api/locations/"),
          fetch("http://localhost:3001/api/pharmacy/"),
          fetch("http://localhost:3001/api/medical-facilities/")
        ]);

        // Kiểm tra response
        if (!locationsRes.ok || !pharmaciesRes.ok || !medicalFacilitiesRes.ok) {
          throw new Error('Có lỗi khi tải dữ liệu từ API');
        }

        const [locationsData, pharmaciesData, medicalFacilitiesData] = await Promise.all([
          locationsRes.json(),
          pharmaciesRes.json(),
          medicalFacilitiesRes.json()
        ]);

        // Tạo map để truy xuất nhanh location theo ID
        const locationMap = {};
        locationsData.forEach(location => {
          locationMap[location.location_id] = location;
        });

        // Kết hợp dữ liệu
        const combinedData = [];

        // Thêm pharmacies với thông tin location - GIỮ LẠI object_type từ location
        pharmaciesData.forEach(pharmacy => {
          const location = locationMap[pharmacy.pharmacy_point_id];
          if (location && location.coordinates) {
            // Tạo object mới, giữ lại object_type từ location
            const combinedPoint = {
              ...location,
              ...pharmacy,
              object_type: location.object_type || 'Pharmacy',
              type: 'pharmacy',
              details: pharmacy
            };
            combinedData.push(combinedPoint);
          }
        });

        // Thêm medical facilities với thông tin location - GIỮ LẠI object_type từ location
        medicalFacilitiesData.forEach(facility => {
          const location = locationMap[facility.facility_point_id];
          if (location && location.coordinates) {
            // Tạo object mới, giữ lại object_type từ location
            const combinedPoint = {
              ...location,
              ...facility,
              object_type: location.object_type || 'Medical Facility',
              type: 'medical_facility',
              details: facility
            };
            combinedData.push(combinedPoint);
          }
        });

        // Thêm các location khác (nếu có) không thuộc 2 loại trên
        locationsData.forEach(location => {
          const isPharmacy = pharmaciesData.some(p => p.pharmacy_point_id === location.location_id);
          const isMedicalFacility = medicalFacilitiesData.some(m => m.facility_point_id === location.location_id);
          
          if (!isPharmacy && !isMedicalFacility && location.coordinates) {
            combinedData.push({
              ...location,
              type: 'other',
              object_type: location.object_type || 'Other'
            });
          }
        });

        setLocations(combinedData);
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm render nội dung popup tùy theo loại
  const renderPopupContent = (point) => {
    // Xác định tiêu đề dựa trên type và object_type
    const getTitle = () => {
      if (point.type === 'pharmacy') {
        return `💊 ${point.object_type || 'NHÀ THUỐC'}`;
      } else if (point.type === 'medical_facility') {
        return `🏥 ${point.object_type || 'CƠ SỞ Y TẾ'}`;
      } else {
        return `📍 ${point.object_type || 'ĐỊA ĐIỂM'}`;
      }
    };

    return (
      <div>
        <strong>{getTitle()}</strong><br />
        <hr style={{ margin: '5px 0' }} />
        
        {/* Hiển thị object_type từ location */}
        <div><strong>Loại đối tượng:</strong> {point.object_type || 'Không xác định'}</div>
        
        {point.type === 'pharmacy' && point.details && (
          <>
            <div><strong>Tên nhà thuốc:</strong> {point.details.pharmacy_name || 'Không có tên'}</div>
            {point.details.phone && <div><strong>Điện thoại:</strong> {point.details.phone}</div>}
            {point.details.opening_hours && <div><strong>Giờ mở cửa:</strong> {point.details.opening_hours}</div>}
          </>
        )}
        
        {point.type === 'medical_facility' && point.details && (
          <>
            <div><strong>Tên cơ sở:</strong> {point.details.facility_name || 'Không có tên'}</div>
            {point.details.phone && <div><strong>Điện thoại:</strong> {point.details.phone}</div>}
            {point.details.emergency_services !== undefined && 
              <div><strong>Cấp cứu:</strong> {point.details.emergency_services ? 'Có' : 'Không'}</div>}
          </>
        )}
        
        {/* Thông tin chung từ location */}
        {point.address && <div><strong>Địa chỉ:</strong> {point.address}</div>}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ 
        height: "600px", 
        width: "100%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#f5f5f5"
      }}>
        <div>Đang tải dữ liệu bản đồ...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: "600px", 
        width: "100%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#f5f5f5"
      }}>
        <div style={{ color: "red" }}>Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Legend cho bản đồ */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
        fontSize: '14px'
      }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Chú thích:</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{
            width: '15px',
            height: '15px',
            backgroundColor: '#28a745',
            marginRight: '5px',
            borderRadius: '50%'
          }}></div>
          <span>Nhà thuốc</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{
            width: '15px',
            height: '15px',
            backgroundColor: '#dc3545',
            marginRight: '5px',
            borderRadius: '50%'
          }}></div>
          <span>Cơ sở y tế</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '15px',
            height: '15px',
            backgroundColor: '#007bff',
            marginRight: '5px',
            borderRadius: '50%'
          }}></div>
          <span>Địa điểm khác</span>
        </div>
      </div>

      <MapContainer
        center={[10.762622, 106.660172]}
        zoom={13}
        style={{ height: "600px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {locations.map((point) => {
          // Kiểm tra xem point có coordinates không
          if (!point.coordinates || !point.coordinates.coordinates) {
            return null;
          }

          const [longitude, latitude] = point.coordinates.coordinates;
          
          return (
            <Marker
              key={`${point.type}_${point.location_id}`}
              position={[latitude, longitude]}
              icon={getIconByType(point.type)}
            >
              <Popup>
                {renderPopupContent(point)}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}