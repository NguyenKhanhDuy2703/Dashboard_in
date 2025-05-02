const { getSqlServerPool, mysqlConnection } = require("../config/config");

const payrollModel = {
  async getAllPayrollFollowingEmployee(cb) {
    try {
      const query = `
        SELECT 
          em.EmployeeID,
          em.FullName,
          de.DepartmentName,
          po.PositionName,
          sa.SalaryMonth,
          sa.BaseSalary,
          sa.Bonus,
          sa.Deductions,
          sa.NetSalary
        FROM employees em
        LEFT JOIN departments de ON em.DepartmentID = de.DepartmentID
        LEFT JOIN positions po ON em.PositionID = po.PositionID
        LEFT JOIN salaries sa ON em.EmployeeID = sa.EmployeeID
      `;

      const pool = await getSqlServerPool();
      const resultSQLDepartment = await pool.request().query("SELECT * FROM Employees");

      const [rows] = await mysqlConnection.query(query);

      const mergedEmployees = resultSQLDepartment.recordset
        .map((item) => {
          const mysqlEmployee = rows.find(
            (row) => row.EmployeeID === item.EmployeeID && row.FullName === item.FullName
          );
          if (mysqlEmployee) {
            return {
              ...item,
              DepartmentName: mysqlEmployee.DepartmentName,
              PositionName: mysqlEmployee.PositionName,
              SalaryMonth: mysqlEmployee.SalaryMonth,
              BaseSalary: mysqlEmployee.BaseSalary,
              Bonus: mysqlEmployee.Bonus,
              Deductions: mysqlEmployee.Deductions,
              NetSalary: mysqlEmployee.NetSalary,
            };
          } else {
            return null;
          }
        })
        .filter((item) => item !== null); // ✅ đúng: filter

      cb(null, { payrolls: mergedEmployees });
    } catch (error) {
      console.error("Error fetching salary:", error.message);
      cb(error, null);
    }
  },
  async getEmployeeById(employeeId, cb) {
    try {
      const query = `
        SELECT 
          em.EmployeeID,
          em.FullName,
          de.DepartmentName,
          po.PositionName,
          sa.SalaryMonth,
          sa.BaseSalary,
          sa.Bonus,
          sa.Deductions,
          sa.NetSalary
        FROM employees em
        LEFT JOIN departments de ON em.DepartmentID = de.DepartmentID
        LEFT JOIN positions po ON em.PositionID = po.PositionID
        LEFT JOIN salaries sa ON em.EmployeeID = sa.EmployeeID
        WHERE em.EmployeeID = ?
      `;
  
      const pool = await getSqlServerPool();
      const resultSQLDepartment = await pool.request()
      .input("EmployeeId", employeeId)
      .query("SELECT * FROM Employees WHERE EmployeeID = @EmployeeId", );
  
      const [rows] = await mysqlConnection.query(query, [employeeId]);
  
      // Merge data from SQL Server and MySQL
      const mergedEmployee = resultSQLDepartment.recordset
        .map((item) => {
          const mysqlEmployee = rows.find(
            (row) => row.EmployeeID === item.EmployeeID && row.FullName === item.FullName
          );
          if (mysqlEmployee) {
            return {
              ...item,
              DepartmentName: mysqlEmployee.DepartmentName,
              PositionName: mysqlEmployee.PositionName,
              SalaryMonth: mysqlEmployee.SalaryMonth,
              BaseSalary: mysqlEmployee.BaseSalary,
              Bonus: mysqlEmployee.Bonus,
              Deductions: mysqlEmployee.Deductions,
              NetSalary: mysqlEmployee.NetSalary,
            };
          } else {
            return null;
          }
        })
        .filter((item) => item !== null); 
  
      if (mergedEmployee.length > 0) {
        cb(null, { employee: mergedEmployee[0] }); 
      } else {
        cb(null, { employee: null });
      }
    } catch (error) {
      console.error("Error fetching employee by ID:", error.message);
      cb(error, null);
    }
  }, async updatePayrollByEmployID ({Bonus , Deductions , EmployeeID} , cb){
    try {
        const query = `
          UPDATE salaries
           JOIN employees em ON salaries.EmployeeID = em.EmployeeID
          SET Bonus = ?,
              Deductions = ?,
              NetSalary = BaseSalary + ? - ?
          WHERE em.EmployeeID = ?
         
        `;
  
        const pool = await getSqlServerPool();
        // check if employee exists in SQL Server
        const resultSQLDepartment = await pool.request()
        .input("EmployeeId", EmployeeID)
        .query("SELECT * FROM Employees WHERE EmployeeID = @EmployeeId", );
        
        if (resultSQLDepartment.recordset.length !== 0) {
            const [rows] = await mysqlConnection.query(query, [Bonus, Deductions ,Bonus ,Deductions , EmployeeID]);
        }
    
      
        cb(null, { message: "Update payroll successfully" });
      } catch (error) {
        cb(error, null);
      }
  }
  
 
};

module.exports = payrollModel;
