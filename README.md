# 🛒 React Vite Redux Project

Dự án này là một ứng dụng web xây dựng bằng **React** (thư viện giao diện), **Vite** (công cụ bundler/serve nhanh), và **Redux** (quản lý trạng thái toàn cục).  
Ứng dụng mô phỏng một hệ thống thương mại điện tử cơ bản với các tính năng: đăng nhập, đăng xuất, tìm kiếm sản phẩm, quản lý giỏ hàng,...

---

## 🚀 Cài đặt và chạy

### Yêu cầu môi trường

- **Node.js** >= 18
- **npm** hoặc **yarn** hoặc **pnpm**

### Các bước thực hiện

1. **Clone** dự án về máy:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   Cài đặt gói phụ thuộc:
   ```

bash
Sao chép mã
npm install

# hoặc

yarn install
Chạy dự án ở môi trường phát triển:

bash
Sao chép mã
npm run dev
Ứng dụng sẽ chạy tại địa chỉ: http://localhost:5173

Build cho môi trường production:

bash
Sao chép mã
npm run build
Xem thử bản build:

bash
Sao chép mã
npm run preview
🧩 Thành phần chính

1. Header

2. Sidebar

3. LoadingOverlay

📦 Quản lý trạng thái (Redux)
Cấu trúc Redux
store/ chứa cấu hình Redux store.

features/ chia nhỏ reducer theo từng chức năng:

userSlice: quản lý trạng thái đăng nhập.

cartSlice: quản lý giỏ hàng (danh sách sản phẩm, tổng số lượng).

productSlice: quản lý sản phẩm (danh sách sản phẩm, từ khóa tìm kiếm).

uiSlice: quản lý UI (LoadingOverlay).

Nguyên tắc
State toàn cục nằm trong Redux Store.

Actions là sự kiện (login, logout, searchProducts, setLoading,...).

Reducers nhận state + action → trả về state mới (bất biến, không thay đổi trực tiếp).

Async logic (ví dụ gọi API đăng nhập, tìm kiếm sản phẩm) xử lý bằng createAsyncThunk (Redux Toolkit).

⚙️ Chức năng
🔑 Đăng nhập / Đăng xuất
Người dùng nhập tài khoản + mật khẩu → gọi API → nếu thành công lưu token vaof cookie + thông tin user vào Redux userSlice.

Khi đăng xuất → xoá token, reset user state.

Header sẽ cập nhật giao diện (hiển thị “Đăng nhập” hoặc avatar người dùng).

🔍 Tìm kiếm sản phẩm
Ô tìm kiếm lắng nghe nhập liệu.

Sau khi người dùng nhập → dispatch action searchProductsThunk gọi API sản phẩm.

Kết quả tìm kiếm hiển thị trong danh sách sản phẩm.

🛒 Giỏ hàng
Người dùng có thể thêm sản phẩm từ danh sách vào giỏ → dispatch addProduct.

Xem giỏ hàng: hiển thị danh sách sản phẩm + số lượng + tổng giá.

Xóa sản phẩm → dispatch deleteProduct.

Cập nhật số lượng → dispatch addProduct hoặc minusProduct.

🎭 Trạng thái tải (LoadingOverlay)
Khi đang gọi API (đăng nhập, tìm sản phẩm, thêm giỏ hàng) → bật overlay.

Sau khi hoàn tất → tắt overlay.

Hiển thị các liên kết đến trang chính, danh mục sản phẩm, tài khoản cá nhân.

📁 Cấu trúc thư mục
Sao chép mã
src/
├─ components/
│ ├─ Header.jsx
│ ├─ Sidebar.jsx
│ └─ LoadingOverlay.jsx
│
├─redux
| ├─ features/
| ├─ user/
│ │ └─ userSlice.js
│ ├─ cart/
│ │ └─ cartSlice.js
│ ├─ product/
│ │ └─ productSlice.js
│ └─ uiSlice.js
│ ├─ store.js
│
├─ pages/
│ ├─ Home.jsx
│ ├─ Login.jsx
│ └─ Cart.jsx
│ └─ ProductDetail.jsx
│ └─ Profile.jsx
│
└─ main.jsx

📝 Ghi chú
Dự án sử dụng Redux Toolkit để giảm bớt mã lặp.

Dùng React Router DOM để điều hướng (trang chủ, đăng nhập, giỏ hàng,...).

Dùng Vite giúp tốc độ khởi động nhanh hơn so với CRA (create-react-app).
