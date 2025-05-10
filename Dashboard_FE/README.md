service ( chứa hàm gọi API ) |=> gọi Api thông qua redux (example authSlice.js ) => xuất data ra và lưu trữ trong store => usedispatch (để gọi api từ hàm gọi api trong redux) => useSelector để lấy dữ liệu từ store 

                            | => gọi Api thông qua context => sử dụng tại trang cần dữ liệu và gọi tới api thông qua API lấy từ service
