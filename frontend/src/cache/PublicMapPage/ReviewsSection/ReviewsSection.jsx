import React, { useState, useEffect } from 'react';
import './ReviewsSection.css';

const ReviewsSection = ({ facilityId, facility }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      patientName: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Bác sĩ rất tận tâm, nhân viên thân thiện. Cơ sở vật chất hiện đại, sạch sẽ.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      patientName: 'Trần Thị B',
      rating: 4,
      comment: 'Khám nhanh, đúng hẹn. Tuy nhiên chờ kết quả hơi lâu.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 3,
      patientName: 'Lê Văn C',
      rating: 3,
      comment: 'Dịch vụ ổn, giá cả hợp lý. Nhưng bãi đỗ xe hơi chật.',
      date: '2024-01-05',
      verified: false
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    patientName: ''
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      patientName: newReview.patientName || 'Khách hàng ẩn danh',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', patientName: '' });
    setShowReviewForm(false);
  };

  const getRatingStats = () => {
    const total = reviews.length;
    const average = reviews.reduce((sum, review) => sum + review.rating, 0) / total;
    const distribution = [0, 0, 0, 0, 0];

    reviews.forEach(review => {
      distribution[5 - review.rating]++;
    });

    return { total, average: average.toFixed(1), distribution };
  };

  const stats = getRatingStats();
  // Thêm thông tin cơ sở y tế
  useEffect(() => {
    if (facility) {
      // Có thể fetch reviews từ API dựa trên facility.id
      console.log('Loading reviews for:', facility.name);
    }
  }, [facility]);


  return (
    <div className="reviews-section">

      {/* Thêm header với thông tin facility */}
      {facility && (
        <div className="facility-review-header">
          <h5>{facility.name}</h5>
          <div className="facility-rating-overview">
            <span className="overall-rating">{facility.rating}</span>
            <span className="rating-stars">
              {'★'.repeat(Math.floor(facility.rating))}
              {'☆'.repeat(5 - Math.floor(facility.rating))}
            </span>
            <span className="total-reviews">({facility.reviewCount} đánh giá)</span>
          </div>
        </div>
      )}

      {/* Review Stats */}
      <div className="review-stats">
        <div className="overall-rating">
          <div className="average-rating">{stats.average}</div>
          <div className="rating-stars">
            {'★'.repeat(Math.floor(stats.average))}
            {'☆'.repeat(5 - Math.floor(stats.average))}
          </div>
          <div className="total-reviews">{stats.total} đánh giá</div>
        </div>

        <div className="rating-distribution">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="distribution-item">
              <span className="star-count">{rating} ★</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(stats.distribution[5 - rating] / stats.total) * 100}%`
                  }}
                ></div>
              </div>
              <span className="count">{stats.distribution[5 - rating]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Button */}
      <div className="add-review-section">
        <button
          className="btn btn-primary"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          <i className="bi bi-pencil-square me-2"></i>
          Viết đánh giá
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="review-form">
          <h6>Đánh giá của bạn</h6>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên (tùy chọn)</label>
              <input
                type="text"
                className="form-control"
                value={newReview.patientName}
                onChange={(e) => setNewReview(prev => ({
                  ...prev,
                  patientName: e.target.value
                }))}
                placeholder="Tên của bạn"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Đánh giá sao</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${newReview.rating >= star ? 'active' : ''}`}
                    onClick={() => setNewReview(prev => ({
                      ...prev,
                      rating: star
                    }))}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Nhận xét</label>
              <textarea
                className="form-control"
                rows="4"
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({
                  ...prev,
                  comment: e.target.value
                }))}
                placeholder="Chia sẻ trải nghiệm của bạn..."
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowReviewForm(false)}
              >
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        <h6>Đánh giá từ người dùng</h6>

        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="patient-info">
                <strong>{review.patientName}</strong>
                {review.verified && (
                  <span className="verified-badge">
                    <i className="bi bi-patch-check-fill"></i>
                    Đã xác thực
                  </span>
                )}
              </div>
              <div className="review-meta">
                <span className="review-date">{review.date}</span>
                <span className="review-rating">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </span>
              </div>
            </div>

            <div className="review-comment">
              {review.comment}
            </div>

            <div className="review-actions">
              <button className="btn-like">
                <i className="bi bi-hand-thumbs-up"></i>
                Hữu ích
              </button>
              <button className="btn-report">
                <i className="bi bi-flag"></i>
                Báo cáo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;