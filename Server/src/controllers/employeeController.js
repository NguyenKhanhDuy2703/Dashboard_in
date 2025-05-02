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
    DepartmentID,
    PositionID,
    Status,
    Email,
    Gender
  } = req.body;
  try {
    if (
      !FullName ||
      !DateOfBirth ||
      !PhoneNumber ||
      !HireDate ||
      !DepartmentID ||
      !PositionID ||
      !Status ||
      !Email ||
      !Gender
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
      DepartmentID,
      PositionID,
      Status,
      Email,
      Gender
    };
    // kiem tra nhan vien da tồn tại  hay chưa
    employeeModel.getEmployeeByEmail(Email, (err, data) => {
      if (data.length !== 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
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
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteEmployeeController = (req, res) => {
  const { Email } = req.body;
  employeeModel.deleteEmployeeByEmail(Email, (err, data) => {
    try {

      if (err) {
        return res.status(400).json({
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
        message: error,
      });
    }
  });
};
const updateEmployeeController = (req, res) => {
  const {
    EmployeeId,
    FullName,
    Gender,
    DateOfBirth,
    PhoneNumber,
    HireDate,
    DepartmentID,
    PositionID,
    Status,
    Email,
  } = req.body;
  employeeModel.updateEmployeeById(
    {
      EmployeeId,
      FullName,
      DateOfBirth,
      PhoneNumber,
      HireDate,
      DepartmentID,
      PositionID,
      Status,
      Email,
      Gender,
    },
    (err, data) => {
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
          message: "Update employee success",
          data: data,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    }
  );
};
const searchEmployeeController = (req, res) => {
  const { EmployeeId, FullName, DepartmentID, PositionID } = req.query;
  employeeModel.searchEmployee(
    { EmployeeId, FullName, DepartmentID, PositionID },
    (err, data) => {
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
          message: "Search employee success",
          data: data,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    }
  );
};

module.exports = {
  getAllEmployeesController,
  getEmployeeByIdController,
  addNewEmployeeController,
  deleteEmployeeController,
  updateEmployeeController,
  searchEmployeeController,
};
