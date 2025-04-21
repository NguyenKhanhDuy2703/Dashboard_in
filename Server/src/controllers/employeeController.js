const employeeModel = require ("../models/employee.model.js")
// noi tuong tac voi model 
// va tra ve du lieu cho client
//1. import model
//2. tao controller
//3. goi model va tra ve du lieu cho client
//4. export controller
//5. import controller vao route
//6. goi controller trong route

const getEmployeesController = ( req , res ) => {
    // controller bao gồm  2 tham số req va res
    // req : là request từ client gửi lên server
    // res : là response từ server gửi về client
    // trong controller sẽ gọi model và trả về dữ liệu cho client
    // ví dụ như lấy danh sách nhân viên
    // trong model sẽ có các hàm để tương tác với database
    // model sẽ trả về một phương thức để lấy dữ liệu từ database
    // phuong thức nhận một callback ( bao gồm 2 tham só là err và result)
    // err : là lỗi nếu có
    // result : là kết quả trả về từ database
    
    employeeModel.getAllEmployees((err, result) => {
        if (err) {  
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: 'Error fetching employees' });
        }
        res.status(200).json(result);
    });
}
module.exports = {
    getEmployeesController
}