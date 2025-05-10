 import axiosInstance from "./axiosInstance";
 
 export const login   = async (email , password) => {
     try {
        const url = "/auth/login";
        const response = await axiosInstance.post(url, { email, password });
         return response;
     } catch (error) {
         console.error("Login error:", error);
         throw error; // Rethrow the error to be handled by the calling functi
     }
    
}

export const getToken  = async () => {
    try {
        const url = "/get-token";
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Get token error:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}