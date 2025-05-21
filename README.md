# 📊 HR & Payroll Integrated Dashboard

## 📝 Mô tả dự án

**HR & Payroll Integrated Dashboard** là một ứng dụng web quản lý giúp tích hợp hai hệ thống hiện có trong doanh nghiệp:

- **HUMAN_2025 (SQL Server):** Hệ thống quản lý thông tin nhân sự.
- **PAYROLL (MySQL):** Hệ thống quản lý lương, thưởng, cổ tức và chấm công.

Mục tiêu của dự án là xây dựng một Dashboard trung gian, không làm thay đổi hệ thống cũ nhưng có thể đồng bộ dữ liệu, hiển thị báo cáo tổng hợp, cảnh báo thông minh, và hỗ trợ ra quyết định nhanh chóng.

---

## 🧰 Công nghệ sử dụng

### ✅ Frontend (React + Vite)

- React 19, React Router v7
- Redux Toolkit, Axios
- Tailwind CSS, Lucide React Icons
- Recharts (biểu đồ), Xlsx (xuất Excel), Toastify (thông báo)

### ✅ Backend (Node.js + Express)

- Express.js
- JWT, bcrypt, cookie-parser (xác thực & bảo mật)
- SQL Server (`mssql`), MySQL (`mysql2`)
- dotenv, cors, nodemon, morgan

---

## 📁 Cấu trúc thư mục

project-root/
├── client/ # React (Vite) frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── store/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Express backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ ├── utils/
│ ├── app.js
│ └── .env
│
└── README.md

---

## 📦 Thông tin Dependencies

### 🔙 Backend (`server/package.json`)

{
  "name": "server",
  "version": "1.0.0",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "mssql": "^11.0.1",
    "mysql2": "^3.14.0",
    "node": "^20.18.1",
    "nodemon": "^3.1.3"
  }
}
###  FronEnd
{
  "name": "dashboard",
  "version": "0.0.0",
  "type": "module",
  "dependencies": {
    "@reduxjs/toolkit": "^2.7.0",
    "@tailwindcss/vite": "^4.1.2",
    "axios": "^1.8.4",
    "date-fns": "^4.1.0",
    "dayjs": "^1.11.13",
    "file-saver": "^2.0.5",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.488.0",
    "numeral": "^2.0.6",
    "react": "^19.1.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.5.0",
    "react-toastify": "^11.0.5",
    "recharts": "^2.15.3",
    "tailwindcss": "^4.1.2",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@tailwindcss/postcss": "^4.1.3",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react-swc": "^3.8.0",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "vite": "^6.2.0"
  }
}
#### run 
FE
cd Dashboard 
npm install
npm run dev
BE 
cd Server 
npm install
npm start 
