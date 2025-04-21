const express = require('express');
const router = express.Router();
 const  {getEmployeesController} = require("../controllers/employeeController")
 // xây đừng đường dẫn cho route theo từng chức năng 
// ví dụ như lấy danh sách nhân viên
// cấu trúc câu lệnh  bao gồm 2 phần  path  và controller
// path : /list-user
// controller : getEmployeesController

router.get('/list-user' , getEmployeesController)


module.exports = router