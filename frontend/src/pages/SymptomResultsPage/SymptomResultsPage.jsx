import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './SymptomResultsPage.css';

// Dữ liệu mẫu cơ sở y tế
const healthcareFacilities = [
  {
    id: 1,
    name: 'Bệnh viện Đa khoa TP.HCM',
    address: '125 Lý Chính Thắng, Quận 3, TP.HCM',
    distance: '2.5 km',
    rating: 4.5,
    reviews: 128,
    specialties: ['Nội tổng quát', 'Ngoại khoa', 'Cấp cứu', 'Hô hấp', 'Tim mạch'],
    insurance: ['Bảo hiểm y tế', 'Bảo Việt', 'Bảo hiểm Prudential'],
    priceRange: 'trung bình',
    openHours: '24/24',
    appointmentAvailable: true,
    waitTime: '15 phút',
    type: 'hospital',
    coordinates: { lat: 10.782, lng: 106.688 },
    emergencyDepartment: true,
    specialtiesScore: {
      'Nội tổng quát': 9,
      'Hô hấp': 8,
      'Tim mạch': 7
    },
treatmentProcess: {
      estimatedTime: '2-4 giờ',
      steps: [
        {
          step: 1,
          title: 'Tiếp nhận & Đăng ký',
          description: 'Đến quầy tiếp nhận, xuất trình CMND/CCCD, thẻ BHYT và mã đặt lịch (nếu có)',
          location: 'Tầng 1 - Quầy tiếp nhận',
          duration: '10-15 phút',
          requirements: ['CMND/CCCD', 'Thẻ BHYT', 'Mã đặt lịch']
        },
        {
          step: 2,
          title: 'Khám lâm sàng',
          description: 'Bác sĩ khám tổng quát, hỏi bệnh sử và thăm khám triệu chứng',
          location: 'Tầng 2 - Phòng khám số 201-210',
          duration: '20-30 phút',
          requirements: ['Phiếu khám bệnh', 'Sổ khám bệnh (nếu có)']
        },
        {
          step: 3,
          title: 'Xét nghiệm/Chẩn đoán',
          description: 'Thực hiện các xét nghiệm cần thiết theo chỉ định của bác sĩ',
          location: 'Tầng 3 - Khoa xét nghiệm',
          duration: '30-60 phút',
          requirements: ['Phiếu chỉ định xét nghiệm', 'Mẫu bệnh phẩm (nếu cần)']
        },
        {
          step: 4,
          title: 'Tư vấn & Kê đơn',
          description: 'Bác sĩ tư vấn kết quả, kê đơn thuốc và hướng dẫn điều trị',
          location: 'Tầng 2 - Phòng khám ban đầu',
          duration: '15-20 phút',
          requirements: ['Kết quả xét nghiệm', 'Phiếu tư vấn']
        },
        {
          step: 5,
          title: 'Thanh toán & Nhận thuốc',
          description: 'Thanh toán viện phí và nhận thuốc tại quầy dược',
          location: 'Tầng 1 - Quầy thanh toán & Dược',
          duration: '15-20 phút',
          requirements: ['Hóa đơn', 'Đơn thuốc']
        }
      ],
      notes: [
        'Bệnh nhân cần đến trước 15 phút so với giờ hẹn',
        'Mang theo toàn bộ hồ sơ bệnh án cũ (nếu có)',
        'Có thể thanh toán bằng tiền mặt, thẻ hoặc ví điện tử',
        'Hỗ trợ làm thủ tục BHYT ngay tại chỗ'
      ],
      specialFeatures: [
        'Hỗ trợ đặt lịch online 24/7',
        'Có khu vực chờ có wifi, nước uống miễn phí',
        'Hỗ trợ người khuyết tật, phụ nữ có thai',
        'Dịch vụ lấy máu xét nghiệm tại nhà (có phí)'
      ]
    }
  },
  {
    id: 2,
    name: 'Phòng khám Đa khoa Quốc tế',
    address: '1 Lê Lợi, Quận 1, TP.HCM',
    distance: '1.8 km',
    rating: 4.8,
    reviews: 89,
    specialties: ['Nhi khoa', 'Tai mũi họng', 'Da liễu', 'Thần kinh'],
    insurance: ['Bảo hiểm y tế', 'Bảo hiểm Bảo Minh', 'Bảo hiểm Manulife'],
    priceRange: 'cao',
    openHours: '07:00 - 20:00',
    appointmentAvailable: true,
    waitTime: '30 phút',
    type: 'clinic',
    coordinates: { lat: 10.776, lng: 106.700 },
    emergencyDepartment: false,
    specialtiesScore: {
      'Tai Mũi Họng': 9,
      'Thần kinh': 8,
      'Nội tổng quát': 7
    },
    // THÊM: Quy trình khám chữa bệnh
    treatmentProcess: {
      estimatedTime: '1-2 giờ',
      steps: [
        {
          step: 1,
          title: 'Check-in & Tư vấn ban đầu',
          description: 'Nhân viên tiếp đón, hướng dẫn thủ tục và đưa vào phòng chờ VIP',
          location: 'Sảnh chính - Bàn tiếp tân',
          duration: '5-10 phút',
          requirements: ['CMND/Passport', 'Thẻ bảo hiểm']
        },
        {
          step: 2,
          title: 'Khám chuyên sâu',
          description: 'Bác sĩ chuyên khoa khám trực tiếp, có thể sử dụng thiết bị chẩn đoán tại phòng',
          location: 'Phòng khám chuyên khoa',
          duration: '30-45 phút',
          requirements: []
        },
        {
          step: 3,
          title: 'Xét nghiệm nhanh',
          description: 'Thực hiện xét nghiệm cơ bản ngay tại phòng khám',
          location: 'Phòng xét nghiệm tại chỗ',
          duration: '15-25 phút',
          requirements: []
        },
        {
          step: 4,
          title: 'Tư vấn & Kết luận',
          description: 'Bác sĩ giải thích kết quả, tư vấn điều trị chi tiết',
          location: 'Phòng tư vấn riêng',
          duration: '20-30 phút',
          requirements: []
        }
      ],
      notes: [
        'Không cần chờ đợi lâu, có lịch hẹn chính xác theo giờ',
        'Bác sĩ nói được tiếng Anh, tiếng Hàn, tiếng Nhật',
        'Có dịch vụ chăm sóc sau khám qua điện thoại',
        'Xuất hóa đơn cho bảo hiểm quốc tế'
      ],
      specialFeatures: [
        'Phòng chờ VIP với đồ uống cao cấp',
        'Bác sĩ nước ngoài có chứng chỉ quốc tế',
        'Hệ thống đặt lịch thông minh, ít phải chờ',
        'Dịch vụ chăm sóc khách hàng 1:1'
      ]
    }
  },
  {
    id: 3,
    name: 'Trung tâm Y tế Quận 5',
    address: '786 Nguyễn Trãi, Quận 5, TP.HCM',
    distance: '3.2 km',
    rating: 4.2,
    reviews: 56,
    specialties: ['Nội tổng quát', 'Sản phụ khoa', 'Xét nghiệm', 'Tiêu hóa'],
    insurance: ['Bảo hiểm y tế'],
    priceRange: 'thấp',
    openHours: '07:30 - 17:00',
    appointmentAvailable: true,
    waitTime: '45 phút',
    type: 'medical-center',
    coordinates: { lat: 10.754, lng: 106.668 },
    emergencyDepartment: true,
    specialtiesScore: {
      'Tiêu hóa': 9,
      'Nội tổng quát': 8,
      'Cơ Xương Khớp': 6
    },
    // THÊM: Quy trình khám chữa bệnh
    treatmentProcess: {
      estimatedTime: '2-3 giờ',
      steps: [
        {
          step: 1,
          title: 'Lấy số thứ tự',
          description: 'Lấy số thứ tự tự động tại máy lấy số ở cổng vào',
          location: 'Cổng chính - Máy lấy số',
          duration: '5-10 phút',
          requirements: ['Thẻ BHYT', 'CMND']
        },
        {
          step: 2,
          title: 'Khai báo y tế',
          description: 'Điền thông tin vào phiếu khám bệnh và khai báo y tế',
          location: 'Quầy khai báo',
          duration: '10-15 phút',
          requirements: []
        },
        {
          step: 3,
          title: 'Khám theo số thứ tự',
          description: 'Chờ gọi số và vào khám theo đúng số thứ tự',
          location: 'Phòng khám tập trung',
          duration: '20-40 phút',
          requirements: ['Phiếu khám bệnh', 'Số thứ tự']
        },
        {
          step: 4,
          title: 'Thực hiện chỉ định',
          description: 'Thực hiện xét nghiệm, siêu âm tại các phòng chức năng',
          location: 'Các phòng chức năng',
          duration: '30-60 phút',
          requirements: ['Phiếu chỉ định']
        },
        {
          step: 5,
          title: 'Trả kết quả & Thanh toán',
          description: 'Nhận kết quả và thanh toán theo diện BHYT hoặc tự trả',
          location: 'Quầy trả kết quả & Thu ngân',
          duration: '15-25 phút',
          requirements: ['Phiếu thu', 'Kết quả xét nghiệm']
        }
      ],
      notes: [
        'Ưu tiên khám cho đối tượng hưởng BHYT',
        'Có thể đông bệnh nhân vào buổi sáng',
        'Miễn phí khám cho một số đối tượng chính sách',
        'Làm việc cả thứ 7, nghỉ Chủ nhật'
      ],
      specialFeatures: [
        'Chi phí thấp, phù hợp BHYT',
        'Có xe cấp cứu lưu động',
        'Khám từ thiện định kỳ',
        'Tư vấn sức khỏe cộng đồng miễn phí'
      ]
    }
  },
   {
    id: 4,
    name: 'Bệnh viện Nhi Đồng',
    address: '15 Võ Trường Toản, Quận 1, TP.HCM',
    distance: '2.9 km',
    rating: 4.7,
    reviews: 203,
    specialties: ['Nhi khoa', 'Cấp cứu nhi', 'Dinh dưỡng', 'Hô hấp'],
    insurance: ['Bảo hiểm y tế', 'Bảo hiểm Bảo Việt', 'Bảo hiểm AIA'],
    priceRange: 'trung bình',
    openHours: '24/24',
    appointmentAvailable: false,
    waitTime: '60 phút',
    type: 'hospital',
    coordinates: { lat: 10.788, lng: 106.695 },
    emergencyDepartment: true,
    specialtiesScore: {
      'Nhi khoa': 10,
      'Hô hấp': 8,
      'Nội tổng quát': 7
    },
    // THÊM: Quy trình khám chữa bệnh
    treatmentProcess: {
      estimatedTime: '2-4 giờ',
      steps: [
        {
          step: 1,
          title: 'Phân loại tiếp nhận',
          description: 'Y tá phân loại mức độ khẩn cấp, hướng dẫn thủ tục phù hợp',
          location: 'Khu tiếp nhận trẻ em',
          duration: '10-15 phút',
          requirements: ['Giấy khai sinh/CMND trẻ', 'Sổ khám bệnh']
        },
        {
          step: 2,
          title: 'Khám nhi khoa',
          description: 'Bác sĩ nhi khoa khám, đánh giá tình trạng trẻ',
          location: 'Phòng khám nhi theo độ tuổi',
          duration: '20-30 phút',
          requirements: []
        },
        {
          step: 3,
          title: 'Vui chơi chờ xét nghiệm',
          description: 'Trẻ có thể vui chơi tại khu vực chờ đặc biệt trong khi chờ xét nghiệm',
          location: 'Khu vui chơi trẻ em',
          duration: '30-60 phút',
          requirements: []
        },
        {
          step: 4,
          title: 'Tư vấn cha mẹ',
          description: 'Bác sĩ tư vấn phụ huynh về cách chăm sóc, điều trị tại nhà',
          location: 'Phòng tư vấn gia đình',
          duration: '15-25 phút',
          requirements: []
        }
      ],
      notes: [
        'Có khu vực thay tã, pha sữa miễn phí',
        'Đội ngũ bác sĩ chuyên về tâm lý trẻ em',
        'Hệ thống theo dõi bệnh nhi hiện đại',
        'Có phòng cách ly cho bệnh truyền nhiễm'
      ],
      specialFeatures: [
        'Khu vui chơi có giám sát y tế',
        'Bác sĩ biết cách giao tiếp với trẻ',
        'Thiết bị chuyên dụng cho trẻ sơ sinh',
        'Chương trình giáo dục sức khỏe cho phụ huynh'
      ]
    }
  },
  {
    id: 5,
    name: 'Phòng khám Tim mạch Sài Gòn',
    address: '341 Sư Vạn Hạnh, Quận 10, TP.HCM',
    distance: '4.1 km',
    rating: 4.9,
    reviews: 156,
    specialties: ['Tim mạch', 'Nội tổng quát', 'Hô hấp'],
    insurance: ['Bảo hiểm y tế', 'Bảo hiểm Prudential', 'Bảo hiểm AIA'],
    priceRange: 'cao',
    openHours: '08:00 - 18:00',
    appointmentAvailable: true,
    waitTime: '20 phút',
    type: 'specialty-clinic',
    coordinates: { lat: 10.768, lng: 106.670 },
    emergencyDepartment: false,
    specialtiesScore: {
      'Tim mạch': 10,
      'Hô hấp': 8,
      'Nội tổng quát': 8
    },
    // THÊM: Quy trình khám chữa bệnh
    treatmentProcess: {
      estimatedTime: '1.5-2.5 giờ',
      steps: [
        {
          step: 1,
          title: 'Đo điện tâm đồ cơ bản',
          description: 'Thực hiện đo ECG ngay khi check-in để đánh giá ban đầu',
          location: 'Phòng đo điện tim',
          duration: '10 phút',
          requirements: []
        },
        {
          step: 2,
          title: 'Khám tim mạch chuyên sâu',
          description: 'Bác sĩ chuyên khoa tim mạch khám và đánh giá toàn diện',
          location: 'Phòng khám tim mạch',
          duration: '30-40 phút',
          requirements: ['Kết quả ECG', 'Hồ sơ bệnh tim (nếu có)']
        },
        {
          step: 3,
          title: 'Siêu âm tim Doppler',
          description: 'Thực hiện siêu âm tim để đánh giá cấu trúc và chức năng tim',
          location: 'Phòng siêu âm tim',
          duration: '20-30 phút',
          requirements: []
        },
        {
          step: 4,
          title: 'Tư vấn điều trị dài hạn',
          description: 'Lập kế hoạch điều trị, theo dõi và tư vấn lối sống',
          location: 'Phòng tư vấn tim mạch',
          duration: '20-30 phút',
          requirements: ['Kết quả siêu âm', 'Đơn thuốc (nếu có)']
        }
      ],
      notes: [
        'Cần nhịn ăn 4-6 giờ trước khi khám tim',
        'Mang theo tất cả thuốc đang sử dụng',
        'Có dịch vụ theo dõi huyết áp 24h',
        'Tư vấn dinh dưỡng cho bệnh nhân tim mạch'
      ],
      specialFeatures: [
        'Máy đo ECG thế hệ mới',
        'Bác sĩ tim mạch từ bệnh viện đầu ngành',
        'Dịch vụ đặt stent, can thiệp mạch vành',
        'Câu lạc bộ bệnh nhân tim mạch'
      ]
    }
  },
  {
    id: 6,
    name: 'Bệnh viện Tai Mũi Họng TW',
    address: '263 Điện Biên Phủ, Quận 3, TP.HCM',
    distance: '2.1 km',
    rating: 4.6,
    reviews: 187,
    specialties: ['Tai Mũi Họng', 'Phẫu thuật', 'Nội tổng quát'],
    insurance: ['Bảo hiểm y tế', 'Bảo hiểm Bảo Việt'],
    priceRange: 'trung bình',
    openHours: '24/24',
    appointmentAvailable: true,
    waitTime: '25 phút',
    type: 'specialty-hospital',
    coordinates: { lat: 10.780, lng: 106.690 },
    emergencyDepartment: true,
    specialtiesScore: {
      'Tai Mũi Họng': 10,
      'Nội tổng quát': 7,
      'Hô hấp': 8
    },
    // THÊM: Quy trình khám chữa bệnh
    treatmentProcess: {
      estimatedTime: '1.5-3 giờ',
      steps: [
        {
          step: 1,
          title: 'Khám nội soi tai mũi họng',
          description: 'Bác sĩ thực hiện nội soi để quan sát trực tiếp vùng bệnh',
          location: 'Phòng nội soi TMH',
          duration: '15-20 phút',
          requirements: []
        },
        {
          step: 2,
          title: 'Đo thính lực (nếu cần)',
          description: 'Kiểm tra thính lực bằng máy đo chuyên dụng',
          location: 'Phòng đo thính lực',
          duration: '20-30 phút',
          requirements: []
        },
        {
          step: 3,
          title: 'Chẩn đoán hình ảnh',
          description: 'Chụp X-quang, CT scan vùng đầu mặt cổ khi cần',
          location: 'Khoa chẩn đoán hình ảnh',
          duration: '30-45 phút',
          requirements: ['Phiếu chỉ định']
        },
        {
          step: 4,
          title: 'Tư vấn phẫu thuật/Điều trị',
          description: 'Bác sĩ tư vấn phương pháp điều trị hoặc lịch phẫu thuật',
          location: 'Phòng tư vấn phẫu thuật',
          duration: '20-30 phút',
          requirements: ['Kết quả nội soi', 'Kết quả xét nghiệm']
        }
      ],
      notes: [
        'Không ăn uống trước khi nội soi 2 giờ',
        'Báo trước nếu có dị ứng thuốc tê',
        'Có phòng phẫu thuật một ngày',
        'Theo dõi sau phẫu thuật tại nhà'
      ],
      specialFeatures: [
        'Hệ thống nội soi 4K hiện đại',
        'Phòng phẫu thuật vi phẫu tai',
        'Dịch vụ cấy ốc tai điện tử',
        'Phục hồi chức năng ngôn ngữ'
      ]
    }
  }
];


// Dữ liệu mẫu đánh giá theo bệnh viện
const facilityReviews = {
  1: [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      rating: 5,
      date: '15/10/2023',
      comment: 'Bác sĩ rất tận tâm, cơ sở vật chất hiện đại. Thời gian chờ khá lâu nhưng đáng giá.',
      helpful: 12,
      verified: true,
      hasImages: true
    },
    {
      id: 2,
      user: 'Trần Thị B',
      rating: 4,
      date: '12/10/2023',
      comment: 'Dịch vụ tốt, nhân viên thân thiện. Giá cả hợp lý so với chất lượng.',
      helpful: 8,
      verified: true,
      hasImages: false
    },
    {
      id: 3,
      user: 'Lê Văn C',
      rating: 3,
      date: '10/10/2023',
      comment: 'Cơ sở hơi đông đúc, nhưng bác sĩ chẩn đoán chính xác. Xét nghiệm nhanh.',
      helpful: 5,
      verified: false,
      hasImages: true
    },
    {
      id: 4,
      user: 'Phạm Thị D',
      rating: 5,
      date: '08/10/2023',
      comment: 'Đã khám ở đây nhiều lần. Luôn hài lòng với dịch vụ. Bác sĩ tư vấn rất nhiệt tình.',
      helpful: 15,
      verified: true,
      hasImages: false
    }
  ],
  2: [
    {
      id: 5,
      user: 'Mai Thị F',
      rating: 5,
      date: '18/10/2023',
      comment: 'Phòng khám sang trọng, bác sĩ chuyên nghiệp. Giá hơi cao nhưng xứng đáng.',
      helpful: 9,
      verified: true,
      hasImages: true
    },
    {
      id: 6,
      user: 'Đặng Văn G',
      rating: 4,
      date: '16/10/2023',
      comment: 'Dịch vụ quốc tế, bác sĩ nói tiếng Anh tốt. Thích hợp cho người nước ngoài.',
      helpful: 6,
      verified: true,
      hasImages: false
    },
    {
      id: 7,
      user: 'Hoàng Văn H',
      rating: 5,
      date: '14/10/2023',
      comment: 'Khám nhi khoa rất tốt. Bác sĩ kiên nhẫn với trẻ em. Phòng chờ có khu vui chơi cho bé.',
      helpful: 11,
      verified: true,
      hasImages: true
    }
  ],
  3: [
    {
      id: 8,
      user: 'Vũ Văn I',
      rating: 4,
      date: '20/10/2023',
      comment: 'Giá cả phải chăng, phù hợp với bảo hiểm y tế. Dịch vụ nhanh chóng, ít phải chờ đợi.',
      helpful: 8,
      verified: true,
      hasImages: false
    },
    {
      id: 9,
      user: 'Lý Thị K',
      rating: 3,
      date: '19/10/2023',
      comment: 'Cơ sở hơi cũ nhưng dịch vụ ổn. Bác sĩ có kinh nghiệm, nhưng thời gian chờ hơi lâu.',
      helpful: 4,
      verified: false,
      hasImages: false
    },
    {
      id: 10,
      user: 'Trịnh Văn L',
      rating: 5,
      date: '17/10/2023',
      comment: 'Khám tổng quát tốt, chi phí thấp. Phù hợp với sinh viên và người có thu nhập thấp.',
      helpful: 10,
      verified: true,
      hasImages: true
    }
  ],
  4: [
    {
      id: 11,
      user: 'Mẹ bé Tú Anh',
      rating: 5,
      date: '22/10/2023',
      comment: 'Bệnh viện chuyên về nhi khoa tốt nhất. Bác sĩ rất hiểu tâm lý trẻ em. Bé nhà tôi không sợ khám nữa.',
      helpful: 14,
      verified: true,
      hasImages: true
    },
    {
      id: 12,
      user: 'Ba bé Minh Đức',
      rating: 4,
      date: '21/10/2023',
      comment: 'Cấp cứu nhi nhanh chóng. Đội ngũ y tế tận tâm, xử lý tình huống khẩn cấp rất chuyên nghiệp.',
      helpful: 7,
      verified: true,
      hasImages: false
    },
    {
      id: 13,
      user: 'Chị Thanh Hằng',
      rating: 3,
      date: '20/10/2023',
      comment: 'Đông bệnh nhân, chờ lâu. Nhưng bác sĩ giỏi và chuẩn đoán chính xác. Cần cải thiện thời gian chờ.',
      helpful: 5,
      verified: false,
      hasImages: false
    },
    {
      id: 14,
      user: 'Anh Tuấn Kiệt',
      rating: 5,
      date: '18/10/2023',
      comment: 'Phòng khám sạch sẽ, đồ chơi cho trẻ em nhiều. Bé nhà mình rất thích, không khóc khi đi khám.',
      helpful: 9,
      verified: true,
      hasImages: true
    }
  ],
  5: [
    {
      id: 15,
      user: 'Ông Văn Tấn',
      rating: 5,
      date: '25/10/2023',
      comment: 'Chuyên khoa tim mạch rất tốt. Bác sĩ tư vấn kỹ lưỡng về bệnh tim của tôi.',
      helpful: 10,
      verified: true,
      hasImages: true
    },
    {
      id: 16,
      user: 'Bà Thị Hồng',
      rating: 4,
      date: '24/10/2023',
      comment: 'Máy móc hiện đại, bác sĩ tận tình. Chi phí hơi cao nhưng chất lượng tốt.',
      helpful: 6,
      verified: true,
      hasImages: false
    }
  ],
  6: [
    {
      id: 17,
      user: 'Anh Minh Trí',
      rating: 5,
      date: '28/10/2023',
      comment: 'Chuyên về tai mũi họng rất tốt. Bác sĩ phẫu thuật thành công cho tôi.',
      helpful: 8,
      verified: true,
      hasImages: true
    },
    {
      id: 18,
      user: 'Chị Lan Anh',
      rating: 4,
      date: '27/10/2023',
      comment: 'Phẫu thuật nội soi nhẹ nhàng, hồi phục nhanh. Nhân viên chăm sóc chu đáo.',
      helpful: 7,
      verified: true,
      hasImages: false
    }
  ]
};

const SymptomResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(true);
  const [expandedFacilityId, setExpandedFacilityId] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [showTreatmentProcess, setShowTreatmentProcess] = useState(null);

  // THÊM STATE CHO BOOKING MODAL
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '09:00',
    reason: '',
    notes: ''
  });
  const [availableTimes, setAvailableTimes] = useState([
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Lấy dữ liệu từ trang trước
  const searchData = location.state || {
    symptom: 'Sốt cao',
    suggestedSpecialty: 'Nội tổng quát',
    emergencyLevel: 'medium'
  };


  // Chuyên khoa liên quan đến triệu chứng
  const relatedSpecialties = getRelatedSpecialties(searchData.symptom);

  // Xử lý click xem đánh giá
  const handleViewReviews = (facilityId) => {
    if (expandedFacilityId === facilityId) {
      setExpandedFacilityId(null);
    } else {
      setExpandedFacilityId(facilityId);
    }
    setReviewFilter('all');
  };

   // HÀM HIỂN THỊ QUY TRÌNH KHÁM BỆNH
  const handleShowTreatmentProcess = (facilityId) => {
    setShowTreatmentProcess(facilityId === showTreatmentProcess ? null : facilityId);
  };

  // Lấy đánh giá theo facilityId và filter
  const getReviewsForFacility = (facilityId) => {
    const reviews = facilityReviews[facilityId] || [];

    return reviews.filter(review => {
      switch (reviewFilter) {
        case '5star':
          return review.rating === 5;
        case 'withImages':
          return review.hasImages;
        case 'verified':
          return review.verified;
        default:
          return true;
      }
    });
  };

  // Tính rating trung bình
  const getAverageRating = (facilityId) => {
    const reviews = facilityReviews[facilityId] || [];
    if (reviews.length === 0) return '0.0';
    const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return avg.toFixed(1);
  };

  // Tính toán distribution rating
  const getRatingDistribution = (facilityId) => {
    const reviews = facilityReviews[facilityId] || [];
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(review => {
      const rating = Math.round(review.rating);
      if (distribution[rating] !== undefined) {
        distribution[rating]++;
      }
    });

    return distribution;
  };

  // Lấy thống kê đánh giá
  const getReviewStats = (facilityId) => {
    const reviews = facilityReviews[facilityId] || [];
    const totalReviews = reviews.length;
    const verifiedReviews = reviews.filter(r => r.verified).length;
    const reviewsWithImages = reviews.filter(r => r.hasImages).length;
    const totalHelpful = reviews.reduce((sum, r) => sum + r.helpful, 0);
    const avgHelpful = totalReviews > 0 ? Math.round(totalHelpful / totalReviews) : 0;

    return {
      totalReviews,
      verifiedReviews,
      reviewsWithImages,
      avgHelpful
    };
  };

  // Tìm kiếm cơ sở phù hợp
  const findMatchingFacilities = () => {
    setLoading(true);

    const facilitiesWithScore = healthcareFacilities.map(facility => {
      let relevanceScore = 0;
      let matchDetails = [];

      // Tính điểm dựa trên chuyên khoa
      const specialtyScore = facility.specialtiesScore[searchData.suggestedSpecialty] || 0;
      relevanceScore += specialtyScore;
      if (specialtyScore > 0) {
        matchDetails.push(`Chuyên khoa ${searchData.suggestedSpecialty}: +${specialtyScore} điểm`);
      }

      // Điểm cho các chuyên khoa liên quan
      relatedSpecialties.forEach(specialty => {
        const score = facility.specialtiesScore[specialty] || 0;
        if (score > 0) {
          relevanceScore += score * 0.5;
          matchDetails.push(`Chuyên khoa ${specialty}: +${score * 0.5} điểm`);
        }
      });

      // Ưu tiên cơ sở có khoa cấp cứu nếu triệu chứng nguy hiểm
      if (searchData.emergencyLevel === 'high' && facility.emergencyDepartment) {
        relevanceScore += 10;
        matchDetails.push('Có khoa cấp cứu: +10 điểm');
      }

      // Ưu tiên đánh giá cao
      relevanceScore += facility.rating * 2;
      matchDetails.push(`Đánh giá ${facility.rating} sao: +${facility.rating * 2} điểm`);

      // Giảm điểm nếu không có lịch trống
      if (!facility.appointmentAvailable) {
        relevanceScore -= 5;
        matchDetails.push('Không có lịch trống: -5 điểm');
      }

      return {
        ...facility,
        relevanceScore: Math.round(relevanceScore * 100) / 100,
        matchDetails
      };
    });

    // Sắp xếp theo độ phù hợp
    const sortedFacilities = facilitiesWithScore.sort((a, b) => {
      if (sortBy === 'relevance') {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === 'distance') {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'price') {
        const priceOrder = { 'thấp': 1, 'trung bình': 2, 'cao': 3 };
        return priceOrder[a.priceRange] - priceOrder[b.priceRange];
      }
      return 0;
    });

    setFilteredFacilities(sortedFacilities);
    setLoading(false);
  };

  // Hàm lấy chuyên khoa liên quan
  function getRelatedSpecialties(symptom) {
    const specialtyMap = {
      'Sốt cao': ['Hô hấp', 'Nhiễm trùng'],
      'Đau đầu': ['Thần kinh', 'Nội tổng quát'],
      'Ho kéo dài': ['Hô hấp', 'Tai Mũi Họng'],
      'Đau bụng': ['Tiêu hóa', 'Ngoại khoa'],
      'Khó thở': ['Hô hấp', 'Tim mạch'],
      'Đau ngực': ['Tim mạch', 'Hô hấp'],
      'Đau họng': ['Tai Mũi Họng', 'Nội tổng quát'],
      'Phát ban': ['Da liễu', 'Dị ứng']
    };

    return specialtyMap[symptom] || ['Nội tổng quát'];
  }

  // Hàm lấy cấp độ khẩn cấp
  function getEmergencyLevelText(level) {
    switch (level) {
      case 'high': return { text: 'Cấp độ cao - Cần khám ngay', color: '#dc3545' };
      case 'medium': return { text: 'Cấp độ trung bình - Khám trong ngày', color: '#ffc107' };
      case 'low': return { text: 'Cấp độ thấp - Có thể đặt lịch sau', color: '#28a745' };
      default: return { text: 'Không xác định', color: '#6c757d' };
    }
  }

  // HÀM XỬ LÝ ĐẶT LỊCH MỚI
  const handleBookAppointment = (facilityId) => {
    const facility = healthcareFacilities.find(f => f.id === facilityId);
    if (!facility) return;

    setSelectedFacility(facility);

    // Tạo danh sách bác sĩ mẫu dựa trên chuyên khoa
    const doctors = [
      { id: 1, name: 'BS. Nguyễn Văn An', specialty: facility.specialties[0], experience: '15 năm' },
      { id: 2, name: 'BS. Trần Thị Bình', specialty: facility.specialties[0], experience: '10 năm' },
      { id: 3, name: 'TS. Lê Văn Cường', specialty: facility.specialties[0] || 'Nội tổng quát', experience: '20 năm' }
    ];

    setAvailableDoctors(doctors);
    setSelectedDoctor(doctors[0]?.id || '');

    // Set default values for booking form
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];

    setBookingForm({
      name: '',
      phone: '',
      email: '',
      date: formattedDate,
      time: '09:00',
      reason: searchData.symptom,
      notes: ''
    });

    setBookingStep(1);
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  // Hàm đóng modal đặt lịch
  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedFacility(null);
    setBookingStep(1);
    setBookingConfirmed(false);
  };

  // Hàm xử lý thay đổi form
  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Hàm chuyển bước đặt lịch
  const handleNextStep = () => {
    if (bookingStep === 1) {
      // Validate step 1
      if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        return;
      }
    }
    setBookingStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setBookingStep(prev => prev - 1);
  };

  // Hàm xác nhận đặt lịch
  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setBookingStep(4);
  };

  // Hàm gửi email xác nhận
  const handleSendConfirmation = () => {
    alert(`Đã gửi xác nhận đặt lịch đến ${bookingForm.email || bookingForm.phone}`);
    handleCloseBookingModal();
  };

  useEffect(() => {
    findMatchingFacilities();
  }, [sortBy, searchData]);

  const emergencyInfo = getEmergencyLevelText(searchData.emergencyLevel);

  return (
    <div className="symptom-results-page">
      {/* Header */}
      <div className="results-header">
        <div className="container">
          <div className="header-content">
            <button
              className="back-button"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i> Quay lại
            </button>

            <div className="search-summary">
              <h1>
                <i className="bi bi-search-heart"></i>
                Kết quả tìm kiếm theo triệu chứng
              </h1>
              <div className="search-details">
                <div className="detail-item">
                  <span className="detail-label">Triệu chứng: </span>
                  <span className="detail-value symptom-value">{searchData.symptom}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Chuyên khoa đề xuất: </span>
                  <span className="detail-value specialty-value">{searchData.suggestedSpecialty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Bỏ sidebar filters */}
      <div className="container">
        <div className="results-content">
          {/* Main Results - Chiếm toàn bộ chiều rộng */}
          <div className="main-results full-width">
            {/* Loading State */}
            {loading && (
              <div className="loading-state">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Đang tìm kiếm cơ sở phù hợp...</p>
              </div>
            )}

            {/* Results List */}
            {!loading && filteredFacilities.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">
                  <i className="bi bi-search"></i>
                </div>
                <h4>Không tìm thấy cơ sở phù hợp</h4>
                <p>Vui lòng thử tìm kiếm với triệu chứng khác hoặc liên hệ tư vấn trực tiếp.</p>
                <div className="no-results-actions">
                  <Link to="/" className="btn btn-primary">
                    <i className="bi bi-arrow-left"></i> Tìm kiếm lại
                  </Link>
                  <button className="btn btn-outline-primary">
                    <i className="bi bi-headset"></i> Liên hệ tư vấn
                  </button>
                </div>
              </div>
            ) : (
              // Results List
              <div className="results-list">
                {filteredFacilities.map((facility, index) => {
                  const reviews = getReviewsForFacility(facility.id);
                  const avgRating = getAverageRating(facility.id);
                  const ratingDistribution = getRatingDistribution(facility.id);
                  const reviewStats = getReviewStats(facility.id);
                  const isExpanded = expandedFacilityId === facility.id;

                  return (
                    <div key={facility.id} className="result-card">
                      <div className="card-header">
                        <div className="rank-badge">
                          <div className="rank-number">#{index + 1}</div>
                          <div className="rank-label">Xếp hạng</div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="facility-info">
                          <div className="facility-main">
                            <div className="facility-title">
                              <h3 className="facility-name">
                                {facility.name}
                               
                              </h3>
                              <div className="facility-meta">
                                <span className="facility-type">
                                  <i className="bi bi-building"></i>
                                  {facility.type === 'hospital' ? 'Bệnh viện' :
                                    facility.type === 'clinic' ? 'Phòng khám' :
                                      facility.type === 'specialty-clinic' ? 'Phòng khám chuyên khoa' : 'Trung tâm y tế'}
                                </span>
                                <span className="facility-distance">
                                  <i className="bi bi-geo-alt"></i>
                                  {facility.distance}
                                </span>
                                <span className="facility-rating">
                                  <i className="bi bi-star-fill"></i>
                                  {facility.rating} ({facility.reviews} đánh giá)
                                </span>
                              </div>
                            </div>

                            <p className="facility-address">
                              <i className="bi bi-geo-alt-fill"></i>
                              {facility.address}
                            </p>

                            <div className="facility-specialties">
                              <div className="specialties-label">
                                <i className="bi bi-heart-pulse"></i>
                                Chuyên khoa: 
                              </div>
                              <div className="specialties-tags">
                                {facility.specialties.map((specialty, idx) => (
                                  <span
                                    key={idx}
                                    className={`specialty-tag ${specialty === searchData.suggestedSpecialty ? 'primary' :
                                      relatedSpecialties.includes(specialty) ? 'secondary' : 'default'
                                      }`}
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="facility-details">
                            <div className="facility-features">
                              <div className="feature-item">
                                <div className="feature-icon">
                                  <i className="bi bi-clock"></i>
                                </div>
                                <div className="feature-content">
                                  <div className="feature-label">Giờ mở cửa</div>
                                  <div className="feature-value">{facility.openHours}</div>
                                </div>
                              </div>
                              <div className="feature-item">
                                <div className="feature-icon">
                                  <i className="bi bi-cash"></i>
                                </div>
                                <div className="feature-content">
                                  <div className="feature-label">Mức giá</div>
                                  <div className="feature-value">
                                    {facility.priceRange === 'thấp' ? 'Thấp' :
                                      facility.priceRange === 'cao' ? 'Cao' : 'Trung bình'}
                                  </div>
                                </div>
                              </div>
                              <div className="feature-item">
                                <div className="feature-icon">
                                  <i className="bi bi-shield-check"></i>
                                </div>
                                <div className="feature-content">
                                  <div className="feature-label">Bảo hiểm</div>
                                  <div className="feature-value">{facility.insurance.length} loại</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="facility-actions">
                          <div className="action-buttons">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleBookAppointment(facility.id)}
                              disabled={!facility.appointmentAvailable}
                            >
                              <i className="bi bi-calendar-plus"></i>
                              {facility.appointmentAvailable ? 'Đặt lịch ngay' : 'Hết lịch'}
                            </button>
                            <button
                              className={`btn ${isExpanded ? 'btn-warning' : 'btn-outline-warning'}`}
                              onClick={() => handleViewReviews(facility.id)}
                              title={isExpanded ? 'Đóng đánh giá' : 'Xem đánh giá người dùng'}
                            >
                              <i className={`bi ${isExpanded ? 'bi-chat-left-text-fill' : 'bi-chat-left-text'}`}></i>
                              {isExpanded ? 'Đóng đánh giá' : 'Xem đánh giá'}
                            </button>
                            {/* THÊM NÚT XEM QUY TRÌNH */}
                            <button
                              className={`btn ${showTreatmentProcess === facility.id ? 'btn-info' : 'btn-outline-info'}`}
                              onClick={() => handleShowTreatmentProcess(facility.id)}
                            >
                              <i className="bi bi-diagram-3"></i>
                              {showTreatmentProcess === facility.id ? 'Đóng quy trình' : 'Xem quy trình'}
                            </button>
                          </div>
                        </div>
                      </div>

{/* PHẦN QUY TRÌNH KHÁM BỆNH - THÊM MỚI */}
                      {showTreatmentProcess === facility.id && facility.treatmentProcess && (
                        <div className="treatment-process-section">
                          <div className="process-header">
                            <h5>
                              <i className="bi bi-clipboard-check me-2"></i>
                              Quy trình khám chữa bệnh tại {facility.name}
                            </h5>
                            <div className="estimated-time">
                              <i className="bi bi-clock-history me-1"></i>
                              Thời gian dự kiến: <strong>{facility.treatmentProcess.estimatedTime}</strong>
                            </div>
                          </div>

                          <div className="process-steps">
                            {facility.treatmentProcess.steps.map((step) => (
                              <div key={step.step} className="process-step">
                                <div className="step-number">{step.step}</div>
                                <div className="step-content">
                                  <div className="step-header">
                                    <h6>{step.title}</h6>
                                    <div className="step-meta">
                                      <span className="location">
                                        <i className="bi bi-geo-alt me-1"></i>
                                        {step.location}
                                      </span>
                                      <span className="duration">
                                        <i className="bi bi-clock me-1"></i>
                                        {step.duration}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="step-description">{step.description}</p>
                                  {step.requirements && step.requirements.length > 0 && (
                                    <div className="step-requirements">
                                      <small className="text-muted">Cần chuẩn bị:</small>
                                      <div className="requirements-tags">
                                        {step.requirements.map((req, idx) => (
                                          <span key={idx} className="badge bg-light text-dark me-1">
                                            {req}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Lưu ý và đặc điểm đặc biệt */}
                          <div className="row mt-4">
                            {facility.treatmentProcess.notes && facility.treatmentProcess.notes.length > 0 && (
                              <div className="col-md-6">
                                <div className="process-notes">
                                  <h6>
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    Lưu ý quan trọng
                                  </h6>
                                  <ul className="notes-list">
                                    {facility.treatmentProcess.notes.map((note, idx) => (
                                      <li key={idx}>
                                        <i className="bi bi-check-circle me-2 text-success"></i>
                                        {note}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}

                            {facility.treatmentProcess.specialFeatures && facility.treatmentProcess.specialFeatures.length > 0 && (
                              <div className="col-md-6">
                                <div className="special-features">
                                  <h6>
                                    <i className="bi bi-star me-2"></i>
                                    Đặc điểm nổi bật
                                  </h6>
                                  <ul className="features-list">
                                    {facility.treatmentProcess.specialFeatures.map((feature, idx) => (
                                      <li key={idx}>
                                        <i className="bi bi-plus-circle me-2 text-primary"></i>
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Tips cho người mới */}
                          <div className="tips-section mt-4 p-3 bg-light rounded">
                            <h6>
                              <i className="bi bi-lightbulb me-2"></i>
                              Mẹo cho người lần đầu đến khám
                            </h6>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="tip-item">
                                  <i className="bi bi-alarm text-primary"></i>
                                  <strong>Đến sớm:</strong> Nên đến trước 15-30 phút để làm thủ tục
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="tip-item">
                                  <i className="bi bi-folder text-primary"></i>
                                  <strong>Hồ sơ đầy đủ:</strong> Mang theo tất cả giấy tờ liên quan
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="tip-item">
                                  <i className="bi bi-question-circle text-primary"></i>
                                  <strong>Hỏi kỹ:</strong> Đừng ngần ngại hỏi nhân viên nếu không rõ
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Phần đánh giá expandable - CẬP NHẬT LẠI */}
                      {isExpanded && (
                        <div className="facility-reviews">
                          <div className="reviews-header">
                            <h6>Đánh giá từ người dùng</h6>
                            <div className="rating-summary">
                              <div className="average-rating">
                                <div className="rating-number">{avgRating}<span>/5</span></div>
                                <div className="reviews-count">{reviewStats.totalReviews} đánh giá</div>
                              </div>
                            </div>
                          </div>

                          {/* Reviews Stats */}
                          {reviewStats.totalReviews > 0 && (
                            <div className="review-filters mb-3">
                              <button
                                className={`btn btn-sm ${reviewFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setReviewFilter('all')}
                              >
                                Tất cả ({reviewStats.totalReviews})
                              </button>
                              <button
                                className={`btn btn-sm ${reviewFilter === '5star' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setReviewFilter('5star')}
                              >
                                5 sao ({ratingDistribution[5]})
                              </button>
                              <button
                                className={`btn btn-sm ${reviewFilter === 'withImages' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setReviewFilter('withImages')}
                              >
                                Có hình ảnh ({reviewStats.reviewsWithImages})
                              </button>
                              <button
                                className={`btn btn-sm ${reviewFilter === 'verified' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setReviewFilter('verified')}
                              >
                                Đã xác thực ({reviewStats.verifiedReviews})
                              </button>
                            </div>
                          )}

                          {/* Reviews List */}
                          {reviews.length === 0 ? (
                            <div className="no-reviews text-center py-4">
                              <i className="bi bi-chat-text display-4 text-muted mb-3"></i>
                              <p className="text-muted">
                                {reviewFilter === 'all'
                                  ? 'Chưa có đánh giá nào cho cơ sở này.'
                                  : 'Không tìm thấy đánh giá phù hợp với bộ lọc.'}
                              </p>
                              {reviewFilter !== 'all' && (
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => setReviewFilter('all')}
                                >
                                  Xem tất cả đánh giá
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="reviews-list">
                              {reviews.map(review => (
                                <div key={review.id} className="review-item border-bottom pb-3 mb-3">
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div className="d-flex align-items-center">
                                      <div className="user-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                        {review.user.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="fw-bold">{review.user}</div>
                                        <small className="text-muted">{review.date}</small>
                                      </div>
                                      {review.verified && (
                                        <span className="badge bg-success ms-2">
                                          <i className="bi bi-check-circle me-1"></i> Đã xác thực
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-warning">
                                      {[...Array(5)].map((_, i) => (
                                        <i
                                          key={i}
                                          className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                                        ></i>
                                      ))}
                                    </div>
                                  </div>
                                  <p className="mb-2">{review.comment}</p>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-sm btn-outline-primary">
                                      <i className="bi bi-hand-thumbs-up me-1"></i>
                                      Hữu ích ({review.helpful})
                                    </button>
                                    {review.hasImages && (
                                      <span className="badge bg-light text-dark">
                                        <i className="bi bi-image me-1"></i> Có hình ảnh
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Pagination */}
                {!loading && filteredFacilities.length > 0 && (
                  <div className="results-pagination">
                    <button className="pagination-btn disabled">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="pagination-btn active">1</button>
                    <button className="pagination-btn">2</button>
                    <button className="pagination-btn">3</button>
                    <button className="pagination-btn">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* BOOKING MODAL */}
      {showBookingModal && selectedFacility && (
        <div className="booking-modal-overlay active">
          <div className="booking-modal-container">
            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <h5>
                  <i className="bi bi-calendar-plus me-2"></i>
                  Đặt lịch khám trực tuyến
                </h5>
                <button
                  className="btn-close"
                  onClick={handleCloseBookingModal}
                  disabled={bookingStep === 4 && bookingConfirmed}
                ></button>
              </div>

              <div className="booking-modal-body">
                {/* Facility Info */}
                <div className="booking-facility-info">
                  <h6>{selectedFacility.name}</h6>
                  <div className="facility-details">
                    <span className="badge bg-light text-dark me-2">
                      <i className="bi bi-geo-alt me-1"></i>
                      {selectedFacility.distance}
                    </span>
                    <span className="badge bg-light text-dark me-2">
                      <i className="bi bi-star-fill me-1"></i>
                      {selectedFacility.rating}
                    </span>
                    <span className="badge bg-light text-dark">
                      <i className="bi bi-cash me-1"></i>
                      {selectedFacility.priceRange === 'thấp' ? 'Giá thấp' :
                        selectedFacility.priceRange === 'cao' ? 'Giá cao' : 'Giá trung bình'}
                    </span>
                  </div>
                  <p className="mb-0 text-muted">
                    <small>{selectedFacility.address}</small>
                  </p>
                </div>

                {/* Booking Steps */}
                <div className="booking-steps">
                  <div className={`step ${bookingStep >= 1 ? 'active' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">Thông tin</div>
                  </div>
                  <div className={`step ${bookingStep >= 2 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Thời gian</div>
                  </div>
                  <div className={`step ${bookingStep >= 3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-label">Xác nhận</div>
                  </div>
                  <div className={`step ${bookingStep >= 4 ? 'active' : ''}`}>
                    <div className="step-number">4</div>
                    <div className="step-label">Hoàn tất</div>
                  </div>
                </div>

                {/* Step 1: Patient Information */}
                {bookingStep === 1 && (
                  <div className="booking-step-content">
                    <h6>Thông tin bệnh nhân</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">
                          <i className="bi bi-person me-1"></i>
                          Họ và tên <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={bookingForm.name}
                          onChange={handleBookingFormChange}
                          placeholder="Nhập họ và tên"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          <i className="bi bi-telephone me-1"></i>
                          Số điện thoại <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={bookingForm.phone}
                          onChange={handleBookingFormChange}
                          placeholder="Nhập số điện thoại"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          <i className="bi bi-envelope me-1"></i>
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={bookingForm.email}
                          onChange={handleBookingFormChange}
                          placeholder="Nhập email (nếu có)"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          <i className="bi bi-calendar me-1"></i>
                          Ngày khám dự kiến <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={bookingForm.date}
                          onChange={handleBookingFormChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Appointment Details */}
                {bookingStep === 2 && (
                  <div className="booking-step-content">
                    <h6>Chi tiết lịch hẹn</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">
                          <i className="bi bi-clock me-1"></i>
                          Giờ khám
                        </label>
                        <select
                          className="form-select"
                          name="time"
                          value={bookingForm.time}
                          onChange={handleBookingFormChange}
                        >
                          {availableTimes.map(time => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          <i className="bi bi-person-badge me-1"></i>
                          Bác sĩ (tùy chọn)
                        </label>
                        <select
                          className="form-select"
                          value={selectedDoctor}
                          onChange={(e) => setSelectedDoctor(e.target.value)}
                        >
                          <option value="">Chọn bác sĩ</option>
                          {availableDoctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty} ({doctor.experience})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label">
                          <i className="bi bi-file-text me-1"></i>
                          Lý do khám
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="reason"
                          value={bookingForm.reason}
                          onChange={handleBookingFormChange}
                          placeholder="Mô tả triệu chứng/ lý do khám"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">
                          <i className="bi bi-chat-text me-1"></i>
                          Ghi chú thêm
                        </label>
                        <textarea
                          className="form-control"
                          name="notes"
                          value={bookingForm.notes}
                          onChange={handleBookingFormChange}
                          rows="3"
                          placeholder="Thông tin bổ sung (nếu có)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {bookingStep === 3 && !bookingConfirmed && (
                  <div className="booking-step-content">
                    <h6>Xác nhận thông tin</h6>
                    <div className="booking-summary">
                      <div className="summary-section">
                        <h6>Thông tin bệnh nhân</h6>
                        <p><strong>Họ tên:</strong> {bookingForm.name}</p>
                        <p><strong>SĐT:</strong> {bookingForm.phone}</p>
                        {bookingForm.email && <p><strong>Email:</strong> {bookingForm.email}</p>}
                      </div>

                      <div className="summary-section">
                        <h6>Thông tin lịch hẹn</h6>
                        <p><strong>Cơ sở:</strong> {selectedFacility.name}</p>
                        <p><strong>Ngày:</strong> {bookingForm.date}</p>
                        <p><strong>Giờ:</strong> {bookingForm.time}</p>
                        {selectedDoctor && (
                          <p><strong>Bác sĩ:</strong> {
                            availableDoctors.find(d => d.id === parseInt(selectedDoctor))?.name
                          }</p>
                        )}
                        <p><strong>Lý do:</strong> {bookingForm.reason}</p>
                      </div>

                      <div className="summary-section">
                        <h6>Lưu ý quan trọng</h6>
                        <ul className="booking-notes">
                          <li>Vui lòng đến trước 15 phút để làm thủ tục</li>
                          <li>Mang theo CMND/CCCD và thẻ BHYT (nếu có)</li>
                          <li>Có thể hủy lịch trước 2 giờ mà không bị phí</li>
                          <li>Thông tin lịch hẹn sẽ được gửi qua SMS</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Booking Success */}
                {bookingStep === 4 && bookingConfirmed && (
                  <div className="booking-step-content success">
                    <div className="success-icon">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <h5>Đặt lịch thành công!</h5>

                    <div className="booking-confirmation">
                      <div className="confirmation-code">
                        <strong>Mã đặt lịch:</strong>
                        <span className="code">BK-{Date.now().toString().slice(-8)}</span>
                      </div>

                      <div className="confirmation-details">
                        <p><i className="bi bi-building me-2"></i>
                          <strong>Cơ sở:</strong> {selectedFacility.name}
                        </p>
                        <p><i className="bi bi-calendar me-2"></i>
                          <strong>Thời gian:</strong> {bookingForm.date} lúc {bookingForm.time}
                        </p>
                        <p><i className="bi bi-person me-2"></i>
                          <strong>Bệnh nhân:</strong> {bookingForm.name}
                        </p>
                      </div>

                      <div className="confirmation-instructions">
                        <h6>Hướng dẫn tiếp theo:</h6>
                        <ol>
                          <li>Vui lòng đến trước 15 phút để làm thủ tục</li>
                          <li>Mang theo CMND/CCCD và thẻ BHYT</li>
                          <li>Thông tin đã được gửi đến {bookingForm.email || bookingForm.phone}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="booking-modal-footer">
                {bookingStep < 3 && !bookingConfirmed ? (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={bookingStep === 1 ? handleCloseBookingModal : handlePrevStep}
                    >
                      <i className="bi bi-arrow-left me-1"></i>
                      {bookingStep === 1 ? 'Hủy' : 'Quay lại'}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={bookingStep === 2 ? handleConfirmBooking : handleNextStep}
                    >
                      {bookingStep === 2 ? 'Xác nhận đặt lịch' : 'Tiếp theo'}
                      <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </>
                ) : bookingConfirmed ? (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={handleSendConfirmation}
                    >
                      <i className="bi bi-check-circle me-1"></i>
                      Hoàn tất
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomResults;