import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
 import {getAllEmployee  } from "../../services/employee.sevices"
export const fetchEmployees = createAsyncThunk( 
    'employees/fetchEmployees',
    async ({page , limit}) => {
        
        const response = await getAllEmployee(page , limit); // Gọi API để lấy danh sách nhân viên
        if (response.status !== 200) {
            throw new Error('Failed to fetch employees'); // Ném lỗi nếu không thành công
        }
        return response.data.data; // Trả về dữ liệu nhân viên
    }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    total: 0,
    page: 1,
    limit: 20,
    totalPage: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload.employees;
        state.total = action.payload.totalEmployees;
        state.totalPage = action.payload.totalPage;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setPage } = employeeSlice.actions;
export default employeeSlice.reducer;
