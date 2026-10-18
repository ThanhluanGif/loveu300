# 💖 Website Tình Yêu & Kỷ Niệm 20/10: Nguyễn Thành Luân ❤️ Trương Ngọc Linh

Trang web được thiết kế đặc biệt làm **món quà bất ngờ và nơi lưu giữ kỷ niệm tình yêu** nhân ngày Phụ Nữ Việt Nam 20/10 từ chàng Dev Nguyễn Thành Luân gửi tặng bé iu Trương Ngọc Linh.

---

## ✨ Các Tính Năng Đã Triển Khai

### 1. Lời Chào Mở Đầu & Hộp Quà Bí Mật 20/10
- **Mưa cánh hoa & trái tim rơi (Canvas):** Hiệu ứng cánh hoa hồng kết hợp trái tim hồng bay lượn lãng mạn kèm ánh sáng lấp lánh phản hồi theo chuyển động chuột.
- **Hộp quà tình yêu 3D:** Khi bé Linh bấm vào hộp quà, hiệu ứng pháo hoa trái tim bùng nổ, mở ra thông điệp bí mật và tự động phát nhạc lãng mạn.
- **Tên đôi lứa:** Hiển thị nổi bật: **Nguyễn Thành Luân ❤️ Trương Ngọc Linh**.

### 2. Đồng Hồ Đếm Ngày Yêu Nhau (Love Counter)
- Đếm chính xác số **Ngày, Giờ, Phút, Giây** hai bạn đã bên nhau theo thời gian thực từ ngày kỷ niệm.
- Hiển thị rõ **"Yêu nhau từ ngày: DD/MM/YYYY"** kèm nút **"Đổi ngày"** nhanh chóng để Luân dễ dàng chỉnh sửa bất cứ lúc nào.

### 3. Dòng Thời Gian Tình Yêu (Love Story Timeline)
- Dòng thời gian dọc nghệ thuật nối liền bằng các mốc trái tim đập nhẹ:
  - 📍 *Lần đầu tiên ta gặp gỡ*
  - 📍 *Ngày em đồng ý bên anh*
  - 📍 *Chuyến du lịch đầu tiên cùng nhau*
  - 📍 *Những giây phút bình yên giản dị*
  - 📍 *20 Tháng 10 hôm nay & mãi mãi*
- **Tính năng thêm kỷ niệm:** Bạn có thể tự thêm bất kỳ cột mốc kỷ niệm mới nào của hai đứa trực tiếp ngay trên trang web.

### 4. Album Ảnh Kỷ Niệm Của Chúng Mình (Our Memory Gallery)
- Khung ảnh phong cách Polaroid dán băng keo nghệ thuật kèm chú thích ngọt ngào.
- **Bấm vào ảnh để xem to (Lightbox)** với độ phân giải cao.
- **Lưu giữ ảnh vĩnh viễn (IndexedDB + Nén ảnh tự động):** Cho phép tải ảnh trực tiếp từ điện thoại hoặc máy tính hoặc dán link ảnh. Hệ thống tự động nén ảnh qua Canvas để lưu trữ bền vững trong cơ sở dữ liệu trình duyệt IndexedDB, không bao giờ lo bị tràn dung lượng hay mất ảnh khi tải lại trang!
- **Tính năng xóa ảnh:** Nút xóa ảnh tiện lợi để bạn dễ dàng quản lý album.

### 5. Bức Thư Tình Bí Mật (Wax Seal Love Letter)
- Chiếc phong bì cổ điển niêm phong bằng **con dấu sáp đỏ hình trái tim**.
- Khi chạm vào con dấu, lá thư sẽ bung nở với hiệu ứng trang giấy viết tay mềm mại và font chữ bay bổng chứa đầy tâm sự chân thành từ chàng Dev Nguyễn Thành Luân gửi bé iu Trương Ngọc Linh.
- Có nút **"Sửa thư"** để bạn dễ dàng chỉnh sửa lại lời văn theo ý muốn.

### 6. Nơi Anh Nói Những Lời Yêu Thương Với Em (Dev Love Section)
- **Cửa sổ code lãng mạn "Thuật toán tình yêu" (`luan_loves_linh.js`):** Mang phong cách code của chàng Dev Luân dành cho bé Linh, có nút bấm chạy lệnh với hiệu ứng console và nổ pháo hoa tim!
- **Hộp lời yêu thương ngẫu nhiên:** Nút "Bấm để nhận thêm lời yêu từ Anh Luân 💕" giúp bé Linh đọc được 12+ lời tỏ tình ngọt ngào, cùng tính năng gửi thêm lời nhắn mới.

### 7. Trình Phát Nhạc Tình Yêu (Audio Player)
- Đĩa than xoay tròn nhẹ nhàng trên thanh điều hướng.
- Danh sách bài hát Acoustic & Piano lãng mạn (có Web Audio Synthesizer dự phòng không lo lỗi mạng).

### 8. Bảng Cài Đặt Nhanh (Love Settings Modal)
- Nút biểu tượng ⚙️ trên góc phải cho phép bạn chỉnh sửa nhanh:
  - Tên của bạn trai & bạn gái
  - Ngày bắt đầu yêu (Anniversary Date)
  - Lời chúc mở đầu
  - Nội dung bức thư tình
- Tất cả được lưu tự động trên máy và cập nhật tức thì toàn bộ website mà không cần phải can thiệp vào code.

---

## 🚀 Hướng Dẫn Sử Dụng & Tùy Chỉnh

1. **Mở trang web:** Nhấp đúp chuột vào file `index.html` hoặc chạy lệnh:
   ```bash
   python3 -m http.server 8080
   ```
   Sau đó truy cập: [http://localhost:8080](http://localhost:8080)
2. **Cài đặt thông tin của hai bạn:**
   - Bấm vào nút hình bánh răng ⚙️ ở góc trên bên phải thanh Menu.
   - Nhập tên của bạn, tên bạn gái, chọn ngày bắt đầu yêu và gõ bức thư tình của bạn.
   - Bấm **"Lưu Thay Đổi & Cập Nhật Web"**.
3. **Thêm ảnh thật của hai bạn:**
   - Kéo xuống mục **Album Khoảnh Khắc**, bấm nút **"Thêm Ảnh Kỷ Niệm Của Hai Đứa 📸"** và chọn ảnh kỷ niệm từ máy của bạn.

---

## 🌐 Cách Đưa Lên Mạng Để Gửi Link Tặng Người Yêu

Chỉ cần kéo thả thư mục `20_10` lên [Vercel](https://vercel.com) hoặc [Netlify Drop](https://app.netlify.com/drop) là bạn sẽ có ngay một đường link miễn phí (ví dụ: `https://tang-em-yeu-2010.vercel.app`) để gửi tặng qua Zalo, Messenger hoặc tạo mã QR in lên thiệp tặng nàng!
