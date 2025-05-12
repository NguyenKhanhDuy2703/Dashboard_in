import axiosInstance from "./axiosInstance";

export const notificationAnniversary = async () => {
    const url = "notification/Ani";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching notification:", error);
        throw error;
    }
}
export const notificationLeaveViolation = async () => {
    const url = "notification/leave_violation";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching notification:", error);
        throw error;
    }
}