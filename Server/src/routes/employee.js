const express = require("express");
const router = express.Router();
const {
  getAllEmployeesController,
  getEmployeeByIdController,
  addNewEmployeeController,
  deleteEmployeeController,
  updateEmployeeController,
  searchEmployeeController,
} = require("../controllers/employeeController");
const { authenticatioRole } = require("../middleware/auth/authentication");

router.get("/get-all",authenticatioRole(["Admin" ,"HR_Manager" ,  "Payroll_Manager"]), getAllEmployeesController);
router.get("/get-by-id",authenticatioRole(["Admin" ,"HR_Manager" , "Employee" , "Payroll_Manager"]), getEmployeeByIdController);
router.post("/add-new", addNewEmployeeController);
router.delete("/delete-by-id",authenticatioRole(["Admin" ,"HR_Manager" ]) , deleteEmployeeController);
router.put("/update-by-id",authenticatioRole(["Admin" ,"HR_Manager" ]), updateEmployeeController);

router.get("/search", authenticatioRole(["Admin" ,"HR_Manager"  , "Payroll_Manager"]) ,searchEmployeeController);
module.exports = router;
