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

export const getToken = async () => {
    try {
        const url = "/get-token";
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        const status = error?.response?.status;

        if (status === 500) {
            console.error("Internal Server Error (500):", error);
            return null; // hoặc throw một lỗi tùy chỉnh nếu cần
        }

        throw error; // Ném lại lỗi để nơi gọi xử lý
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