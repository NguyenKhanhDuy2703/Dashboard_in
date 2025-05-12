const express = require('express');
const router = express.Router();
const {getAllPayrollController , getPayrollbyEmployeeController  , updatePayrollByEmployID} = require("../controllers/payrollController");
const { authenticatioRole } = require('../middleware/auth/authentication');

// xây đừng đường dẫn cho route theo từng chức năng

router.get('/list-payroll',authenticatioRole(["Admin" ,"HR_Manager" , "Payroll_Manager"]), getAllPayrollController)
router.get('/list-payroll-by-employeeID',authenticatioRole(["Admin" ,"HR_Manager" , "Payroll_Manager"]) , getPayrollbyEmployeeController)
router.put('/update-payroll-by-employeeID',authenticatioRole(["Admin" , "Payroll_Manager"]), updatePayrollByEmployID)
module.exports = router
