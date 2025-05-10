const { getSqlServerPool, mysqlConnection } = require("../config/config");
const { insertEmployeeMysql, insertEmployeeSQl, updateEmployeeMySQL, updateEmployeeSQl, getAllEmployeesSQL , getEmployeesByIDSQL } = require("../repositories/employee.query");
const sql = require("mssql");

const employeeModel = {
  async getAllEmployees({ page, limit }, cb) {
    try {
      const offset = (page - 1) * limit;
      const pool = await getSqlServerPool();
      const result = await pool
        .request()
        .input("offset", parseInt(offset))
        .input("pageSize", parseInt(limit))
        .query(getAllEmployeesSQL);
      const { recordset } = result;
      const sqlData = recordset.map((row) => ({
        EmployeeID: row.EmployeeID,
        FullName: row.FullName,
        DateOfBirth: row.DateOfBirth?.toLocaleDateString('vi-VN'),
        PhoneNumber: row.PhoneNumber,
        HireDate: row.HireDate?.toLocaleDateString('vi-VN'),
        Department: row.DepartmentName,
        DepartmentID: row.DepartmentID,
        Position: row.PositionName,
        PositionID: row.PositionID,
        Email: row.Email,
        Gender: row.Gender,
        Status: row.Status,
        CreatedAt: row.CreatedAt,
        UpdatedAt: row.UpdatedAt,
      }));

      const totalEmployees = await pool.query(`SELECT COUNT(*) as total FROM Employees`);
      const totalPage = Math.ceil(totalEmployees.recordset[0].total / limit);
      cb(null, { employees: sqlData, totalPage, totalEmployees: totalEmployees.recordset[0].total, page, limit });
    } catch (error) {
      console.error("Error fetching employees from SQL Server:", error);
      cb(error, null);
    }
  },

  async addNewEmployee(employee, cb) {
    const mysqlConn = await mysqlConnection.getConnection(); // lấy kết nối MySQL
    const sqlPool = await getSqlServerPool();
    const sqlTransaction = new sql.Transaction(sqlPool);

    try {
      await sqlTransaction.begin();
      const sqlRequest = new sql.Request(sqlTransaction);
      await mysqlConn.beginTransaction();

      const result = await sqlRequest.query("SELECT IDENT_CURRENT('Employees') AS CurrentIdentity");
      const currentIndex = result.recordset[0].CurrentIdentity || 0;
      const nextIndex = currentIndex + 1;

      const dataSQL = {
        EmployeeID: nextIndex,
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

      const dataMysql = {
        EmployeeID: nextIndex,
        FullName: employee.FullName,
        DepartmentID: employee.DepartmentID,
        PositionID: employee.PositionID,
      };

      // SQL Server insert
      await sqlRequest
        .input("EmployeeID", dataSQL.EmployeeID)
        .input("FullName", dataSQL.FullName)
        .input("DateOfBirth", new Date(dataSQL.DateOfBirth))
        .input("PhoneNumber", dataSQL.PhoneNumber)
        .input("Gender", dataSQL.Gender)
        .input("Email", dataSQL.Email)
        .input("HireDate", new Date(dataSQL.HireDate))
        .input("DepartmentID", dataSQL.DepartmentID)
        .input("PositionID", dataSQL.PositionID)
        .input("Status", dataSQL.Status)
        .query(insertEmployeeSQl);

      // MySQL insert
      await mysqlConn.query(insertEmployeeMysql, [
        dataMysql.EmployeeID,
        dataMysql.FullName,
        dataMysql.DepartmentID,
        dataMysql.PositionID,
      ]);

      await sqlTransaction.commit();
      await mysqlConn.commit();

      cb(null, { message: "Thêm nhân viên thành công." });
    } catch (error) {
      await sqlTransaction.rollback();
      await mysqlConn.rollback();
      console.error("Transaction failed:", error);
      cb(error, null);
    } finally {
      mysqlConn.release(); // Đảm bảo release kết nối MySQL
    }
  },

  async getEmployeeById(EmployeeID, cb) {
    const mysqlConn = await mysqlConnection.getConnection(); // lấy kết nối MySQL
    try {
      const pool = await getSqlServerPool();
      const {recordset} = await pool.request()
        .input("EmployeeId", EmployeeID)
        .query(getEmployeesByIDSQL)
        const sqlData = recordset.map((row) => ({
          EmployeeID: row.EmployeeID,
          FullName: row.FullName,
          DateOfBirth: row.DateOfBirth?.toLocaleDateString('vi-VN'),
          PhoneNumber: row.PhoneNumber,
          HireDate: row.HireDate?.toLocaleDateString('vi-VN'),
          Department: row.DepartmentName,
          DepartmentID: row.DepartmentID,
          Position: row.PositionName,
          PositionID: row.PositionID,
          Email: row.Email,
          Status: row.Status,
          Gender: row.Gender,
        }));
      const [mysql] = await mysqlConn.query(
        `SELECT * FROM employees WHERE EmployeeID = ?`, [EmployeeID]
      );
      if (recordset.length === 0 || mysql.length === 0) {
        cb("Employee not found", null);
      }
      cb(null, sqlData);
    } catch (error) {
      cb(error, null);
    } finally {
      mysqlConn.release(); // Đảm bảo release kết nối MySQL
    }
  },

  async getEmployeeByEmail(email, cb) {
    const mysqlConn = await mysqlConnection.getConnection(); // lấy kết nối MySQL
    try {
      const pool = await getSqlServerPool();
      const { recordset } = await pool.query(
        `SELECT * FROM Employees WHERE Email = '${email}'`
      );
      if (recordset.length !== 0) {
        cb(null, {});
      } else {
        cb(null, recordset);
      }
    } catch (error) {
      cb(error, null);
    } finally {
      mysqlConn.release(); // Đảm bảo release kết nối MySQL
    }
  },

 async deleteEmployeeById(EmployeeID, cb) {
  const mysqlConn = await mysqlConnection.getConnection(); // Lấy kết nối MySQL
  const sqlPool = await getSqlServerPool();
  const sqlTransaction = new sql.Transaction(sqlPool);
  try {
    await sqlTransaction.begin();
    await mysqlConn.beginTransaction();
    
    const sqlRequest = new sql.Request(sqlTransaction);

    // 1. Kiểm tra nhân viên có tồn tại trong SQL Server
    const { recordset } = await sqlRequest
      .input("EmployeeID", EmployeeID)  // Khai báo đúng kiểu dữ liệu cho tham số
      .query(`SELECT EmployeeID, FullName FROM Employees WHERE EmployeeID = @EmployeeID`);
    
    if (recordset.length === 0) {
      return cb({ message: "Không tìm thấy nhân viên trong SQL Server." }, null);
    }

    // 2. Kiểm tra nhân viên có tồn tại trong MySQL
    const [mysqlResult] = await mysqlConn.execute(
      `SELECT EmployeeID, FullName FROM employees WHERE EmployeeID = ?`,
      [EmployeeID]
    );

    // Kiểm tra nếu không tìm thấy nhân viên trong MySQL
    if (mysqlResult.length === 0) {
      return cb({ message: "Không tìm thấy nhân viên trong MySQL." }, null);
    }

    // 3. Xóa các bản liên quan trong SQL Server (Dividends)
    await sqlRequest.query(`DELETE FROM Dividends WHERE EmployeeID = @EmployeeID`);

    // 4. Xóa các bản liên quan trong MySQL (attendance, salaries)
    await mysqlConn.execute(`DELETE FROM attendance WHERE EmployeeID = ?`, [EmployeeID]);
    await mysqlConn.execute('DELETE FROM salaries WHERE EmployeeID = ?', [EmployeeID]);

    // 5. Xóa nhân viên trong SQL Server
    await sqlRequest.query(`DELETE FROM Employees WHERE EmployeeID = @EmployeeID`);

    // 6. Xóa nhân viên trong MySQL
    await mysqlConn.execute(`DELETE FROM employees WHERE EmployeeID = ?`, [EmployeeID]);

    // Commit transaction
    await sqlTransaction.commit();
    await mysqlConn.commit();

    cb( null , { message: "delete Employee successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);

    // Rollback transaction in case of error
    await sqlTransaction.rollback();
    await mysqlConn.rollback();

    cb(error, null);
  } finally {
    mysqlConn.release(); // Đảm bảo release kết nối MySQL
  }
},
    async updateEmployeeById({ EmployeeID, FullName, DateOfBirth, PhoneNumber, HireDate, DepartmentID, PositionID, Status, Email, Gender }, cb) {
    const mysqlConn = await mysqlConnection.getConnection(); // lấy kết nối MySQL
    const sqlPool = await getSqlServerPool();
    const sqlTransaction = new sql.Transaction(sqlPool);
    try {
      // Bắt đầu transaction
      await sqlTransaction.begin();
      await mysqlConn.beginTransaction();
      const sqlRequest = new sql.Request(sqlTransaction);
      
      console.log(EmployeeID, FullName, DateOfBirth, PhoneNumber, HireDate, DepartmentID, PositionID, Status, Email, Gender)

      await sqlRequest
        .input("EmployeeId", EmployeeID)
        .input("FullName", FullName)
        .input("DateOfBirth",sql.Date ,  new Date(DateOfBirth))
        .input("PhoneNumber", PhoneNumber)
        .input("HireDate", sql.Date  ,new Date(HireDate))
        .input("DepartmentID", DepartmentID)
        .input("PositionID", PositionID)
        .input("Status", Status)
        .input("Email", Email)
        .input("Gender", Gender);

      const sqlResult = await sqlRequest.query(updateEmployeeSQl);

      const [mysqlResult] = await mysqlConn.query(updateEmployeeMySQL, [
        FullName,
        DepartmentID,
        PositionID,
        Status,
        EmployeeID,
      ]);
      // Commit transaction
      await sqlTransaction.commit();
      await mysqlConn.commit();

      cb(null, { sqlResult, mysqlResult });
    } catch (error) {
      console.error("Error updating employee:", error);
      // Rollback transaction in case of error
      await sqlTransaction.rollback();
      await mysqlConn.rollback();
      cb(error, null);
    } finally {
      mysqlConn.release(); // Đảm bảo release kết nối MySQL
    }
  },
  async searchEmployee({ EmployeeID, FullName, DepartmentID, PositionID }, cb) {
  const mysqlConn = await mysqlConnection.getConnection(); // lấy kết nối MySQL
  try {
    // Kết nối SQL Server
    const pool = await getSqlServerPool();

    // Tạo điều kiện tìm kiếm cho SQL Server
    let sqlQuery = `
      SELECT * FROM Employees WHERE 1=1
      ${EmployeeID ? `AND EmployeeID = @EmployeeID` : ""}
      ${FullName ? `AND FullName LIKE @FullName` : ""}
      ${DepartmentID ? `AND DepartmentID = @DepartmentID` : ""}
      ${PositionID ? `AND PositionID = @PositionID` : ""}
    `;

    // Tạo điều kiện tìm kiếm cho MySQL
    let mysqlQuery = `
      SELECT * FROM employees WHERE 1=1
      ${EmployeeID ? `AND EmployeeID = ?` : ""}
      ${FullName ? `AND FullName LIKE ?` : ""}
      ${DepartmentID ? `AND DepartmentID = ?` : ""}
      ${PositionID ? `AND PositionID = ?` : ""}
    `;

    // SQL Server request
    const sqlRequest = pool.request();
    if (EmployeeID) sqlRequest.input("EmployeeID", EmployeeID);
    if (FullName) sqlRequest.input("FullName", `%${FullName}%`);
    if (DepartmentID) sqlRequest.input("DepartmentID", DepartmentID);
    if (PositionID) sqlRequest.input("PositionID", PositionID);
    
    const resultSQL = await sqlRequest.query(sqlQuery);

    // MySQL query
    const mysqlParams = [];
    if (EmployeeID) mysqlParams.push(EmployeeID);
    if (FullName) mysqlParams.push(`%${FullName}%`);
    if (DepartmentID) mysqlParams.push(DepartmentID);
    if (PositionID) mysqlParams.push(PositionID);

    const [mysqlResult] = await mysqlConn.execute(mysqlQuery, mysqlParams);

    // Gộp kết quả từ SQL Server và MySQL
    const finalResult = [...resultSQL.recordset, ...mysqlResult];
    cb(null, finalResult);
  } catch (error) {
    console.error("Error searching employees:", error);
    cb(error, null);
  } finally {
    mysqlConn.release(); // Đảm bảo release kết nối MySQL
  }
}

}
module.exports = employeeModel;