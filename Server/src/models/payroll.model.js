const { rows } = require("mssql");
const { getSqlServerPool, mysqlConnection } = require("../config/config");

const payrollModel = {
 async getAllPayrollFollowingEmployee({ page , limit , monthSalary }, cb) {
  try {
    const offset = (page - 1) * limit;

    let query = `
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
    let countQuery = `
      SELECT COUNT(*) as total
      FROM employees em
      LEFT JOIN salaries sa ON em.EmployeeID = sa.EmployeeID
    `;

    const params = [];
    if ( monthSalary!== undefined && monthSalary !== null) {
      query += ` WHERE Month(sa.SalaryMonth) = ?`;
      countQuery += ` WHERE Month(sa.SalaryMonth) = ?`;
      params.push(monthSalary);
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const pool = await getSqlServerPool();
    const resultSQLDepartment = await pool.request().query("SELECT * FROM Employees");

    const [[{ total }]] = await mysqlConnection.query(countQuery, monthSalary ? [monthSalary] : []);
    const [rows] = await mysqlConnection.query(query, params);

    const mergedEmployees = resultSQLDepartment.recordset
      .map((item) => {
        const mysqlEmployee = rows.find(
          (row) => row.EmployeeID === item.EmployeeID && row.FullName === item.FullName
        );
        if (mysqlEmployee) {
          return {
            EmployeeID: item.EmployeeID,
            FullName: item.FullName,
            DepartmentName: mysqlEmployee.DepartmentName,
            PositionName: mysqlEmployee.PositionName,
            SalaryMonth: new Date(mysqlEmployee.SalaryMonth).toLocaleDateString("vi-VN"),
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

    cb(null, {
      payrolls: mergedEmployees,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching salary:", error.message);
    cb(error, null);
  }
}
,
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
              EmployeeID: item.EmployeeID,
              FullName: item.FullName,
              
              DepartmentName: mysqlEmployee.DepartmentName,
              PositionName: mysqlEmployee.PositionName,
              SalaryMonth: new Date(mysqlEmployee.SalaryMonth).toLocaleDateString("vi-VN"),
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
    
      
        cb(null, { message: "Update payroll successfully"  });
      } catch (error) {
        cb(error, null);
      }
  }
  
 
};

module.exports = payrollModel;
