import axiosInstance  from "./axiosInstance"

 export const getAllEmployee = async (page , limit , searchText) => {
    const url ="employee/get-all" 
   const res =  axiosInstance.get(url , {
         params : {
               page : page,
               limit : limit,
               searchText : searchText
         }
   })
   return res
}
export const addNewEmployee = async (data) => {
      const url = "employee/add-new";
      const res = await axiosInstance.post(url, data);
      return res;
   }

export const deleteEmployee = async (EmployeeID) => {
   const url = "employee/delete-by-id";
   console.log(EmployeeID);
   const res = await axiosInstance.delete(url , {
      data : {
         EmployeeID 
      }
   });
   return res;
}
export const updateEmployee = async (data) => {
   const url = "employee/update-by-id";
   const res = await axiosInstance.put(url, data);
   return res;
}

export const getEmployeeById = async (EmployeeID) => {
   const url = "employee/get-by-id";
   const res = await axiosInstance.get(url, {
      params: {
         EmployeeID
      }
   });
   console.log(res); 
   return res;
}
