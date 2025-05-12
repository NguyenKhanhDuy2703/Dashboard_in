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
export const reportFollowingPosition = async () => {
    const url = "report/employee-by-group-job";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}
export const reportFollowingStatus = async () => {
    const url = "report/employee-by-group-status";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}
export const reportFollowingAttendanceMonth = async () => {
    const url = "report/employee-by-group-attendance-month";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}
export const reportSalaryFollowingDepartment = async () => {
    const url = "report/total-salary-by-group-department";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}
export const reportSalaryFollowingMonth = async () => {
    const url = "report/total-bs-bo-de-by-salary-month";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}
export const reportTotalEAS = async () => {
    const url = "report/total-employee-and-salary";
    try {
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}