# 💖 Love Story & 20/10 Keepsake Website
### 🌸 Dành tặng: Bé Iu Trương Ngọc Linh • Từ: Chàng Dev Nguyễn Thành Luân ❤️

[![Live on Vercel](https://img.shields.io/badge/Vercel-Live%20Website-success?style=for-the-badge&logo=vercel)](https://loveu300.vercel.app)
[![Admin Studio](https://img.shields.io/badge/Admin-Dev%20Studio-rose?style=for-the-badge&logo=codewars)](https://loveu300.vercel.app/admin.html)
[![GitHub Repo](https://img.shields.io/badge/GitHub-loveu300-181717?style=for-the-badge&logo=github)](https://github.com/ThanhluanGif/loveu300.git)

---

## 🌐 Đường Dẫn Truy Cập Chính Thức

| Phân Hệ | Link Truy Cập | Mục Đích Sử Dụng |
| :--- | :--- | :--- |
| 🌸 **Trang Khách Xem (Index)** | 👉 **[https://loveu300.vercel.app](https://loveu300.vercel.app)** | Gửi link này cho **Bé Linh** hoặc bạn bè. Giao diện lãng mạn 100%, chế độ an toàn chỉ xem (Read-Only), không sợ bị chỉnh sửa hay phá hoại. |
| 👑 **Studio Quản Trị (Admin)** | 👉 **[https://loveu300.vercel.app/admin.html](https://loveu300.vercel.app/admin.html)** | Dành riêng cho **Nguyễn Thành Luân** quản lý timeline, thông tin cặp đôi, lời chúc, album ảnh. *(Bảo vệ bằng mật mã bảo mật riêng)* |
| 📦 **Dữ Liệu Chuẩn (JSON)** | 👉 **[https://loveu300.vercel.app/data/love_data.json](https://loveu300.vercel.app/data/love_data.json)** | File cấu hình dữ liệu đồng bộ toàn cầu cho website. |

---

## 🏛️ Kiến Trúc Hệ Thống (2 Nhánh Tách Biệt)

```
                               ┌────────────────────────────────────────────────────────┐
                               │                    NGUỒN DỮ LIỆU                       │
                               │  data/love_data.json  &  localStorage trình duyệt      │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
                        ┌─────────────────────────────────┴─────────────────────────────────┐
                        ▼                                                                   ▼
       ┌─────────────────────────────────┐                                 ┌─────────────────────────────────┐
       │     NHÁNH KHÁCH (index.html)    │                                 │     NHÁNH ADMIN (admin.html)    │
       │   Dành riêng cho Bé Linh & Khách │                                 │  Studio Dành Cho Chàng Dev Luân │
       ├─────────────────────────────────┤                                 ├─────────────────────────────────┤
       │ 🌸 Giao diện 100% lãng mạn      │                                 │ 🔒 Khóa màn hình Passcode bí mật│
       │ 🛡️ Chế độ chỉ xem (Read-Only)    │                                 │ ⏳ Tùy chỉnh Timeline (5 mốc)   │
       │ 🚫 Không có nút sửa/xóa gây vướng│                                 │ 💑 Đổi ngày yêu 17/05/2026, tên │
       │ 🔒 Không sợ người lạ phá hoại    │                                 │ 💾 Nút "Lưu & Đồng Bộ Sang Index"│
       └─────────────────────────────────┘                                 │ 📥 Xuất file data/love_data.json│
                                                                           └─────────────────────────────────┘
```

---

## ✨ Các Tính Năng Nổi Bật

### 1. Hộp Quà Bí Ẩn 3D & Hiệu Ứng Mở Quà Đa Tầng 🎁
- **Hào quang ma thuật & Đốm sao bay:** Lớp hào quang thở ánh kim - hồng phấn (`.gift-aura-halo`) cùng 4 đốm sao lấp lánh xoay vần quanh thân hộp.
- **Kỹ xảo bung nắp 3D (`lid-fly-off`):** Khi bấm mở, thân hộp nén đàn hồi bung nở, nắp hộp văng lên cao xoay 3D chân thực, cột tia sáng vàng vụt thẳng từ đáy hộp và trái tim phát quang bay vút lên.
- **Pháo hoa đa tầng tính theo tọa độ thực (`getBoundingClientRect`):** 
  - *Giai đoạn 1 (0ms):* Nổ chùm sao 360° trực tiếp từ miệng hộp quà.
  - *Giai đoạn 2 (320ms):* Pháo confetti 2 bên sườn bắn chéo hội tụ vào giữa.
  - *Giai đoạn 3 (780ms):* Bức thư tình xuất hiện với hiệu ứng 3D Zoom-in mượt mà.

### 2. Đồng Hồ Đếm Ngày Yêu Nhau (Love Counter) ⏳
- **Cột mốc cố định:** **17/05/2026** (Ngày bé Linh đồng ý bên anh).
- Đếm chính xác từng Ngày, Giờ, Phút, Giây hai đứa bên nhau theo thời gian thực.

### 3. Dòng Thời Gian Tình Yêu (Love Story Timeline) 💖
Gồm 5 cột mốc kỷ niệm ngọt ngào được nối bằng trục tim hồng phát sáng:
1. `👀 Ánh Mắt Đầu Tiên` | *Khoảnh khắc đầu tiên* | **Lần Đầu Tiên Ta Gặp Gỡ**
2. `💖 Cột Mốc Yêu Nhau` | *17/05/2026* | **Ngày Bé Linh Đồng Ý Bên Anh**
3. `✈️ Nắm Tay Đi Khắp Nơi` | *Chuyến đi đáng nhớ* | **Chuyến Đi Chơi Đầu Tiên Cùng Nhau**
4. `☕ Bình Yên Bên Em` | *Kỷ niệm khó quên* | **Những Giây Phút Bình Yên Giản Dị**
5. `🌹 20/10 Yêu Thương` | *20 Tháng 10 Hôm Nay* | **20/10 Bên Cạnh Bé Iu Trương Ngọc Linh**

### 4. Album Ảnh Kỷ Niệm (Our Memory Gallery) 📸
- Khung ảnh phong cách Polaroid vintage dán băng keo hồng kèm chú thích.
- **Lightbox xem ảnh chất lượng cao** khi bấm vào ảnh.
- Tự động nén ảnh qua Canvas để lưu trữ bền vững.

### 5. Bức Thư Tình Cổ Điển & Con Dấu Sáp (Wax Seal Letter) 💌
- Phong bì thư mang dấu ấn cổ điển với con dấu sáp đỏ hình trái tim.
- Chạm vào con dấu, bức thư tình dài chứa trọn tình cảm của Luân sẽ cuộn mở nhẹ nhàng.

### 6. Cửa Sổ Code "Thuật Toán Tình Yêu" (`luan_loves_linh.js`) 💻
- Giao diện giả lập macOS Terminal phong cách Dev chuyên nghiệp.
- Cho phép bấm "Chạy code tình yêu" với hiệu ứng in console từng dòng và bung pháo hoa tim!

### 7. Trình Phát Nhạc Tình Yêu Lofi & Acoustic 🎵
- Biểu tượng đĩa than xoay nhịp nhàng trên thanh Menu.
- Tự động phát nhạc khi mở hộp quà hoặc bấm nghe nhạc.

---

## 🛠️ Công Nghệ Sử Dụng

- **HTML5 & Modern CSS3:** 3D Transforms, Keyframe Animations, Perspective, Glassmorphism.
- **Tailwind CSS (CDN):** Responsive mượt mà trên iPhone, Android, Tablet và Desktop.
- **JavaScript (Vanilla ES6+):** Xử lý countdown, audio synthesizer, confetti cannons.
- **Canvas Confetti & Lucide Icons:** Hiệu ứng pháo hoa và bộ icon sắc nét.
- **Git & Vercel:** Tự động CI/CD deploy mỗi khi có commit mới lên nhánh `main`.

---

## 👨‍💻 Hướng Dẫn Dành Cho Chàng Dev (Nguyễn Thành Luân)

### Cách 1: Chỉnh sửa trực tiếp qua Studio Admin
1. Mở trang: [https://loveu300.vercel.app/admin.html](https://loveu300.vercel.app/admin.html)
2. Nhập mật mã bảo mật của Luân
3. Tùy chỉnh các mốc thời gian, lời chúc, câu chữ theo ý muốn.
4. Bấm nút **"💾 Lưu & Đồng Bộ Sang Index"** -> Trang `index.html` lập tức hiển thị nội dung mới!

### Cách 2: Lưu vĩnh viễn vào mã nguồn GitHub
1. Tại trang Admin, bấm nút **"📥 Tải File data/love_data.json"**.
2. Chép đè file tải về vào thư mục `data/love_data.json` trên máy tính.
3. Chạy lệnh:
   ```bash
   git add data/love_data.json
   git commit -m "update: Cập nhật timeline kỷ niệm"
   git push origin main
   ```
4. Vercel sẽ tự động build lại trong 10 giây và áp dụng vĩnh viễn cho tất cả mọi người trên toàn cầu!

---

## ❤️ Lời Nhắn Gửi

> *"Cảm ơn vì em đã xuất hiện và làm thế giới của anh ngập tràn hạnh phúc.*  
> *Nguyện cùng em đi qua tất cả những mùa thu dịu dàng nhất của cuộc đời!"*  
> — **Nguyễn Thành Luân gửi tặng Trương Ngọc Linh** 💍
