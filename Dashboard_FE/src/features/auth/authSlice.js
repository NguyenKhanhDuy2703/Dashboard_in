import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit'
import {getToken} from "../../services/auth.services"
// gọi Api để lấy thông tin người dùng bằng token 
export const fetchUser = createAsyncThunk(
    'auth/fetchUser', 
    async () => {
        const response = await getToken();
        return response.user; // trả về dữ liệu người dùng
    }
);
 const authSlice = createSlice ({
    name :"auth",
    initialState : {
        user : null,
        role : null,
        accessToken : null,
        loading: false,
    },
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true; // Đang tải dữ liệu
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload.email; // Lưu thông tin người dùng vào state
                state.role = action.payload.role; // Lưu vai trò người dùng vào state
                state.accessToken = action.payload.accessToken; // Lưu accessToken vào state
                state.loading = false; // Kết thúc quá trình tải dữ liệu
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false; // Kết thúc quá trình tải dữ liệu khi có lỗi
            });
    },
})
export default authSlice.reducer; // Xuất reducer để sử dụng trong store