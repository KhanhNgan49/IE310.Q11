import React, { useState, useRef } from 'react';
import './PolygonDrawer.css';

const PolygonDrawer = ({ onPolygonComplete, initialPolygon, height = '500px' }) => {
  const [drawingMode, setDrawingMode] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState(initialPolygon || []);
  const [completedPolygons, setCompletedPolygons] = useState([]);
  const mapRef = useRef(null);

  const startDrawing = () => {
    setDrawingMode(true);
    setCurrentPolygon([]);
  };

  const stopDrawing = () => {
    setDrawingMode(false);
    if (currentPolygon.length >= 3) {
      const newPolygon = [...currentPolygon];
      setCompletedPolygons([...completedPolygons, newPolygon]);
      onPolygonComplete(newPolygon);
    }
    setCurrentPolygon([]);
  };

  const handleMapClick = (e) => {
    if (!drawingMode) return;

    const point = {
      lat: e.nativeEvent.offsetY / 5 + 20.8, // Giả lập tọa độ
      lng: e.nativeEvent.offsetX / 5 + 105.5,
      id: Date.now() + Math.random()
    };

    setCurrentPolygon([...currentPolygon, point]);
  };

  const undoLastPoint = () => {
    if (currentPolygon.length > 0) {
      setCurrentPolygon(currentPolygon.slice(0, -1));
    }
  };

  const clearCurrent = () => {
    setCurrentPolygon([]);
  };

  const clearAll = () => {
    setCurrentPolygon([]);
    setCompletedPolygons([]);
  };

  const calculateArea = (polygon) => {
    if (polygon.length < 3) return 0;
    
    // Giả lập tính diện tích
    const baseArea = 100; // km²
    return (baseArea * polygon.length / 3).toFixed(2);
  };

  return (
    <div className="polygon-drawer">
      <div className="drawer-controls">
        <div className="control-group">
          <button 
            className={`btn btn-sm ${drawingMode ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={drawingMode ? stopDrawing : startDrawing}
          >
            <i className={`bi bi-${drawingMode ? 'square' : 'pencil'} me-1`}></i>
            {drawingMode ? 'Kết thúc vẽ' : 'Bắt đầu vẽ'}
          </button>
          
          {drawingMode && (
            <>
              <button 
                className="btn btn-sm btn-outline-warning"
                onClick={undoLastPoint}
                disabled={currentPolygon.length === 0}
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i>
                Hoàn tác
              </button>
              
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={clearCurrent}
                disabled={currentPolygon.length === 0}
              >
                <i className="bi bi-trash me-1"></i>
                Xóa
              </button>
            </>
          )}
        </div>

        <div className="info-group">
          {drawingMode && (
            <div className="drawing-info">
              <span className="points-count">
                Điểm: {currentPolygon.length}
              </span>
              {currentPolygon.length >= 3 && (
                <span className="area-info">
                  Diện tích ước tính: {calculateArea(currentPolygon)} km²
                </span>
              )}
            </div>
          )}
          
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={clearAll}
            disabled={completedPolygons.length === 0 && currentPolygon.length === 0}
          >
            <i className="bi bi-x-circle me-1"></i>
            Xóa tất cả
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="polygon-map-container"
        style={{ height }}
        onClick={handleMapClick}
      >
        <div className="polygon-map-placeholder">
          <div className="map-overlay">
            <i className="bi bi-map"></i>
            <h5>Bản Đồ Vẽ Vùng Dịch</h5>
            <p>
              {drawingMode 
                ? 'Nhấp để thêm điểm vào vùng dịch (tối thiểu 3 điểm)' 
                : 'Nhấn "Bắt đầu vẽ" để khoanh vùng dịch'
              }
            </p>
            
            {drawingMode && currentPolygon.length > 0 && (
              <div className="drawing-stats">
                <div className="stat">
                  <strong>Điểm đã vẽ:</strong> {currentPolygon.length}
                </div>
                {currentPolygon.length >= 3 && (
                  <div className="stat">
                    <strong>Diện tích:</strong> {calculateArea(currentPolygon)} km²
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hiển thị polygon đang vẽ */}
          {currentPolygon.length > 0 && (
            <svg className="polygon-svg" width="100%" height="100%">
              <polygon
                points={currentPolygon.map(p => 
                  `${(p.lng - 105.5) * 5},${(p.lat - 20.8) * 5}`
                ).join(' ')}
                fill="rgba(231, 76, 60, 0.3)"
                stroke="#e74c3c"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              
              {/* Hiển thị các điểm */}
              {currentPolygon.map((point, index) => (
                <circle
                  key={point.id}
                  cx={(point.lng - 105.5) * 5}
                  cy={(point.lat - 20.8) * 5}
                  r="4"
                  fill="#e74c3c"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
          )}

          {/* Hiển thị các polygon đã hoàn thành */}
          {completedPolygons.map((polygon, polyIndex) => (
            <svg key={polyIndex} className="completed-polygon-svg" width="100%" height="100%">
              <polygon
                points={polygon.map(p => 
                  `${(p.lng - 105.5) * 5},${(p.lat - 20.8) * 5}`
                ).join(' ')}
                fill="rgba(231, 76, 60, 0.2)"
                stroke="#c0392b"
                strokeWidth="2"
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Polygons List */}
      {(completedPolygons.length > 0 || currentPolygon.length > 0) && (
        <div className="polygons-list">
          <h6>Danh Sách Vùng Đã Vẽ</h6>
          
          {completedPolygons.map((polygon, index) => (
            <div key={index} className="polygon-item completed">
              <div className="polygon-header">
                <span className="polygon-name">Vùng dịch #{index + 1}</span>
                <span className="polygon-area">{calculateArea(polygon)} km²</span>
              </div>
              <div className="polygon-details">
                <span>{polygon.length} điểm</span>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    const newPolygons = [...completedPolygons];
                    newPolygons.splice(index, 1);
                    setCompletedPolygons(newPolygons);
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
          
          {currentPolygon.length > 0 && (
            <div className="polygon-item current">
              <div className="polygon-header">
                <span className="polygon-name">Đang vẽ...</span>
                <span className="polygon-area">
                  {currentPolygon.length >= 3 ? calculateArea(currentPolygon) + ' km²' : 'Chưa đủ điểm'}
                </span>
              </div>
              <div className="polygon-details">
                <span>{currentPolygon.length} điểm</span>
                <span className="text-warning">Chưa hoàn thành</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PolygonDrawer;