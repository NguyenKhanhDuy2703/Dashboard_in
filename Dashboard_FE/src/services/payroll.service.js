import axiosInstance from "./axiosInstance";

export const getPayrolls = async ( {page , limit = 20 , monthSalary}) => {
    const url ="payroll/list-payroll"
    try {
        const response = await axiosInstance.get(url , {
            params: {
                page,
                limit,
                monthSalary
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching payrolls:", error);
        throw error;
    }
    }
export const getAttendance = async ( {page , limit = 20 }) => {
    const url ="attendance/list-attendance"
    try {
        const response = await axiosInstance.get(url , {
            params: {
                page,
                limit,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching payrolls:", error);
        throw error;
    }
}