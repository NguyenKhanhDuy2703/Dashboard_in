const express = require('express');
const router = express.Router();
const { getAllEmployeesController , getEmployeeByIdController  , addNewEmployeeController , deleteEmployeeController} = require('../controllers/employeeController');

router.get('/get-all', getAllEmployeesController);
router.get('/get-by-id', getEmployeeByIdController);
router.post('/add-new', addNewEmployeeController)
router.delete('/delete-by-id', deleteEmployeeController);

module.exports = router