const { getSqlServerPool, mysqlConnection } = require("../config/config");

const employeeModel = {
  async getAllEmployees(cb) {
    try {
      const pool = await getSqlServerPool();

      const { recordset } = await pool.query("SELECT * FROM Employees");
      const [mysql] = await mysqlConnection.query("SELECT * FROM employees");

      const sqlData = recordset.map((row) => ({
        EmployeeID: `SS-${row.EmployeeID}`,
        FullName: row.FullName,
        DateOfBirth: row.DateOfBirth,
        PhoneNumber: row.PhoneNumber,
        HireDate: row.HireDate,
        Department: row.Department,
        PositionID: row.PositionID,
        Status: row.Status,
        CreatedAt: row.CreatedAt,
        UpdatedAt: row.UpdatedAt,
      }));

      const mysqlData = mysql.map((row) => ({
        EmployeeID: `MS-${row.EmployeeID}`,
        FullName: row.FullName,
        Department: row.Department,
        PositionID: row.PositionID,
        Status: row.Status,
      }));

      // Gộp dữ liệu
      const combinedData = [...sqlData, ...mysqlData];

      // Tạo Map để kiểm tra trùng FullName
      const uniqueMap = new Map();

      const uniqueEmployees = [];
      for (const emp of combinedData) {
        const nameKey = emp.FullName?.trim().toLowerCase(); // chuẩn hóa tên để so
        if (!uniqueMap.has(nameKey)) {
          uniqueMap.set(nameKey, true); // đánh dấu tên đã tồn tại
          uniqueEmployees.push(emp); // thêm vào kết quả
        }
      }

      cb(null, uniqueEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      cb(error, null);
    }
  },
  async addNewEmployee(employee, cb) {
    try {
      const pool = await getSqlServerPool();

      // Lấy EmployeeID lớn nhất từ SQL Server
      const sqlCountQuery = `SELECT Max(EmployeeID) as MaxEmployeeID FROM Employees`;
      const { recordset } = await pool.query(sqlCountQuery);
      // Lấy EmployeeID lớn nhất từ MySQL
      const mysqlCountQuery = `SELECT Max(EmployeeID) as MaxEmployeeID FROM employees`;
      const [mysqlCount] = await mysqlConnection.query(mysqlCountQuery);
      console.log("sqlCountQuery", recordset, "mysqlCountQuery", mysqlCount);
      // Dữ liệu vào SQL Server
      const dataSQL = {
        EmployeeID: recordset[0].MaxEmployeeID + 1 ,
        FullName: employee.FullName,
        DateOfBirth: employee.DateOfBirth,
        PhoneNumber: employee.PhoneNumber,
        Gender: employee.Gender,
        Email: employee.Email,
        HireDate: employee.HireDate,
        DepartmentID: employee.DepartmentID,
        PositionID: employee.PositionID,
        Status: employee.Status,
      };
      // Dữ liệu vào MySQL
      const dataMysql = {
        EmployeeID: mysqlCount[0].MaxEmployeeID +1,
        FullName: employee.FullName,
        DepartmentID: employee.DepartmentID,
        PositionID: employee.PositionID,
      };

      // SQL Server query với biến @
      const sqlQuery = `
        INSERT INTO Employees (   FullName, DateOfBirth, PhoneNumber, Gender, Email, HireDate, DepartmentID, PositionID, Status , CreatedAt, UpdatedAt)
        VALUES (  @FullName, @DateOfBirth, @PhoneNumber, @Gender, @Email, @HireDate, @DepartmentID, @PositionID, @Status , GETDATE(), GETDATE())
      `;

      // MySQL query vẫn dùng ?
      const mysqlQuery = `
        INSERT INTO employees (EmployeeID ,FullName, DepartmentID, PositionID)
        VALUES (?, ?, ? , ?)
      `;


      // Thực thi SQL Server
      const sqlRequest = pool
        .request()
        .input("FullName", dataSQL.FullName)
        .input("DateOfBirth", new Date(dataSQL.DateOfBirth))
        .input("PhoneNumber", dataSQL.PhoneNumber)
        .input("Gender", dataSQL.Gender)
        .input("Email", dataSQL.Email)
        .input("HireDate", new Date(dataSQL.HireDate))
        .input("DepartmentID", dataSQL.DepartmentID)
        .input("PositionID", dataSQL.PositionID)
        .input("Status", dataSQL.Status);

      const sqlResult = await sqlRequest.query(sqlQuery);

      // Thực thi MySQL
      const [mysqlResult] = await mysqlConnection.query(mysqlQuery, [
        dataMysql.EmployeeID,
        dataMysql.FullName,
        dataMysql.DepartmentID,
        dataMysql.PositionID,
      ]);

      cb(null, {mysqlResult, sqlResult});
    } catch (error) {
      console.error("Error adding new employee:", error);
      cb(error, null);
    }
  },
  // Lấy thông tin nhân viên theo ID
  async getEmployeeById(id, cb) {
    try {
      const pool = await getSqlServerPool();
      const { recordset } = await pool.query(
        `SELECT * FROM Employees WHERE EmployeeID = ${id}`
      );
      const [mysql] = await mysqlConnection.query(
        `SELECT * FROM employees WHERE EmployeeID = ${id}`
      );
      if (recordset.length === 0 && mysql.length === 0) {
        cb("Employee not found", null);
      }
      cb(null, recordset[0] || mysql[0]);
    } catch (error) {
      cb(error, null);
    }
  },
  // get nhan vien theo email
    async getEmployeeByEmail(email, cb) {
        try {
        const pool = await getSqlServerPool();
        const { recordset } = await pool.query(
            `SELECT * FROM Employees WHERE Email = '${email}'`
        );
       
        if (recordset.length === 0 && mysql.length === 0) {
            cb("Employee not found", null);
        }
        cb(null, recordset[0] || mysql[0]);
        } catch (error) {
        cb(error, null);
        }
    },
    // delete nhân viên theo id
    async deleteEmployeeById(id, cb) {
      try {
          const pool = await getSqlServerPool();
          let sqlResult = null;
          let mysqlResult = null;
  
          // Kiểm tra nhân viên có tồn tại không
          const { recordset } = await pool.query(
              `SELECT * FROM Employees WHERE EmployeeID = ${id}`
          );
          const [mysql] = await mysqlConnection.query(
              `SELECT * FROM employees WHERE EmployeeID = ${id}`
          );
  
          if (recordset.length !== 0) {
              // 1. Xóa dữ liệu phụ trong Dividends trước
              await pool.query(`DELETE FROM Dividends WHERE EmployeeID = ${id}`);
              // 2. Sau đó mới xóa nhân viên trong Employees
              sqlResult = await pool.query(`DELETE FROM Employees WHERE EmployeeID = ${id}`);
          }
  
          if (mysql.length !== 0) {
              // 1. Xóa dữ liệu phụ trong salaries trước (nếu có)
              await mysqlConnection.query(`DELETE FROM salaries WHERE EmployeeID = ${id}`);
              // 2. Sau đó mới xóa nhân viên trong employees
              [mysqlResult] = await mysqlConnection.query(`DELETE FROM employees WHERE EmployeeID = ${id}`);
          }
  
          cb(null, { sqlResult, mysqlResult });
      } catch (error) {
          cb(error, null);
      }
  }
  
};

module.exports = employeeModel;
