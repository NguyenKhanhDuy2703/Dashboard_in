import axios from "axios";
// tạo một instance axios với baseURL là http://localhost:4000/api
// và export instance này để sử dụng trong các file khác
const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true, // Để gửi cookie cùng với yêu cầu
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Lấy accessToken từ localStorage
    },
});
export default axiosInstance;