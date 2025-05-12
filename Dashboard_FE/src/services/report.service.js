import axiosInstance from "./axiosInstance";

export const  reportFollowingDepartment = async () => {
    const url = "report/employee-by-group-department";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}