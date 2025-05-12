import axiosInstance from "./axiosInstance";
 
 export const login  = async ({email , password}) => {
     try {
        const url = "/auth/login";
        const response = await axiosInstance.post(url, { email, password });
         return response;
     } catch (error) {
            return error.response; // Trả về phản hồi lỗi từ server
     }
    
}

export const getToken  = async () => {
    try {
        const url = "/get-token";
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
      throw new Error("Bạn không có quyền truy cập tài nguyên này."); // ❗ NÉM LỖI RA
    }
    throw error; // Ném lỗi khác nếu không phải lỗi 401
    }
}
export const logout = async () => {
    try {
        const url = "/auth/logout";
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Logout error:", error);
       return error.response; // Trả về phản hồi lỗi từ server
    }
}