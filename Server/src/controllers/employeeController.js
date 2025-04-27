const employeeModel = require("../models/employee.model");

const getAllEmployeesController = (req, res) => {
  employeeModel.getAllEmployees((err, data) => {
    try {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      if (data.length === 0) {
        return res.status(404).json({
          message: "No data found",
        });
      }
      return res.status(200).json({
        message: "Get all employees success",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });
};
const getEmployeeByIdController = (req, res) => {
  const { id } = req.query;
  employeeModel.getEmployeeById(id, (err, data) => {
    try {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      if (data.length === 0) {
        return res.status(404).json({
          message: "No data found",
        });
      }
      return res.status(200).json({
        message: "Get  employees by id success",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });
};
const addNewEmployeeController = (req, res) => {
  const {
    FullName,
    DateOfBirth,
    PhoneNumber,
    HireDate,
    Department,
    PositionID,
    Status,
    Email,
  } = req.body;

  try {
    if (
      !FullName ||
      !DateOfBirth ||
      !PhoneNumber ||
      !HireDate ||
      !Department ||
      !PositionID ||
      !Status ||
      !Email
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newEmployee = {
      FullName,
      DateOfBirth,
      PhoneNumber,
      HireDate,
      Department,
      PositionID,
      Status,
      Email,
    };
    // Check if employee already exists
    employeeModel.getEmployeeByEmail(Email, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      if (Object.keys(data).length !== 0) {
        return res.status(400).json({
          message: "Employee already exists",
        });
      } else {
        employeeModel.addNewEmployee(newEmployee, (err, data) => {
          try {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }

            return res.status(200).json({
              message: "Add new employee success",
              data: data,
            });
          } catch (error) {
            return res.status(500).json({
              message: error.message,
            });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteEmployeeController = (req, res) => {
    const { id } = req.query;
    employeeModel.deleteEmployeeById(id, (err, data) => {
        try {
        if (err) {
            return res.status(500).json({
            message: err.message,
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
            message: "No data found",
            });
        }
        return res.status(200).json({
            message: "Delete employee success",
            data: data,
        });
        } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
        }
    });
}

module.exports = {
  getAllEmployeesController,
  getEmployeeByIdController,
  addNewEmployeeController,
  deleteEmployeeController
};
