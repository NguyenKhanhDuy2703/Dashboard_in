import { createSlice , createAsyncThunk,} from "@reduxjs/toolkit";
import { getPayrolls} from "../../services/payroll.service"
export const fetchPayrolls = createAsyncThunk(
    "payroll/fetchPayrolls",
    async ({page  , monthSalary }) => {
        const response = await getPayrolls({page  , monthSalary});
        console.log("response", response);
       if(response.status !== 200) {
            throw new Error("Failed to fetch payrolls");
        }   
        return response.data.data; 
    }
);
const payrollSlice = createSlice({
    name: "payroll",
    initialState: {
        payrolls: [],
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        loading: false,
        error: null,
    },
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayrolls.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayrolls.fulfilled, (state, action) => {
                state.payrolls = action.payload.payrolls;
                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.pageSize = action.payload.pagination.pageSize;
                state.loading = false;
            })
            .addCase(fetchPayrolls.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})
export default payrollSlice.reducer;