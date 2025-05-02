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

router.get("/get-all", getAllEmployeesController);
router.get("/get-by-id", getEmployeeByIdController);
router.post("/add-new", addNewEmployeeController);
router.delete("/delete-by-id", deleteEmployeeController);
router.put("/update-by-id", updateEmployeeController);
router.get("/search", searchEmployeeController);
module.exports = router;
