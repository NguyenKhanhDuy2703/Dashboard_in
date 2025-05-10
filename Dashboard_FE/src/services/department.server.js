import axiosInstance from "./axiosInstance";
export const getAllDepartmentAndJobs = async () => {
    const url = "department/list-department";
    const res = await axiosInstance.get(url);
    return res.data;
}