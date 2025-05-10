import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../features/auth/authSlice"
import employeeSlice from "../features/employees/employeeSlice"
export const store = configureStore({
  reducer: {
    user: authSlice, 
    employees: employeeSlice, 
  },
})