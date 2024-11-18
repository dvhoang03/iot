



# Dự án IoT Điều Khiển Đèn & Theo Dõi Cảm Biến
Mô tả: Đây là dự án IoT cho phép thu thập dữ liệu từ các cảm biến (nhiệt độ, độ ẩm, ánh sáng) và điều khiển các thiết bị (đèn, quạt, điều hòa) từ xa. Dữ liệu được hiển thị trên giao diện thời gian thực, cùng với các trang quản lý hành động điều khiển và dữ liệu cảm biến.

Tính năng chính
## 1. Dashboard
Hiển thị điều khiển cho đèn, quạt, và điều hòa với các nút bật/tắt.
Hiển thị 3 ô dữ liệu cảm biến: nhiệt độ, độ ẩm, ánh sáng.
Biểu đồ thời gian thực cập nhật liên tục dựa trên dữ liệu cảm biến nhận được.
## 2. Datasensor Page
Bảng hiển thị chi tiết các dữ liệu cảm biến (nhiệt độ, độ ẩm, ánh sáng).
Chức năng tìm kiếm và sắp xếp dữ liệu để người dùng dễ dàng theo dõi.
## 3. Action Page
Bảng liệt kê các hành động bật/tắt của các thiết bị (đèn, quạt, điều hòa).
Hỗ trợ tìm kiếm và sắp xếp các hành động.
Công nghệ sử dụng
Frontend: ReactJS
Backend: ExpressJS
Hardware: ESP8266
Giao tiếp: MQTT (Message Queuing Telemetry Transport)
