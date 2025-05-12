const express = require('express');
const router = express.Router();
const {
  EmployeeByGroupDepartmentController,
  EmployeeByGroupJobController,
  EmployeeByGroupStatusController,
  EmployeeByGroupAttendanceMonthController,
  TotalSalaryByGroupDepartmentController,
  TotalNetSalaryByGroupBySalaryMonthController,
  TotalBsBoDeBySalaryMonthController ,
    TotalEmployeeAndSalaryController

} = require('../controllers/reportController');

router.get('/employee-by-group-department', EmployeeByGroupDepartmentController);
router.get('/employee-by-group-job', EmployeeByGroupJobController);
router.get('/employee-by-group-status', EmployeeByGroupStatusController);
router.get('/employee-by-group-attendance-month', EmployeeByGroupAttendanceMonthController);
router.get('/total-salary-by-group-department', TotalSalaryByGroupDepartmentController);
router.get('/total-net-salary-by-group-by-salary-month', TotalNetSalaryByGroupBySalaryMonthController);
router.get('/total-bs-bo-de-by-salary-month', TotalBsBoDeBySalaryMonthController);
router.get('/total-employee-and-salary', TotalEmployeeAndSalaryController);



module.exports = router;