const express = require('express');
const router = express.Router();
const {getAllPayrollController , getPayrollbyEmployeeController  , updatePayrollByEmployID} = require("../controllers/payrollController")

// xây đừng đường dẫn cho route theo từng chức năng

router.get('/list-payroll', getAllPayrollController)
router.get('/list-payroll-by-employeeID', getPayrollbyEmployeeController)
router.put('/update-payroll-by-employeeID', updatePayrollByEmployID)
module.exports = router
