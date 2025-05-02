const { getSqlServerPool, mysqlConnection } = require("../config/config");
const {insertEmployeeMysql , insertEmployeeSQl , updateEmployeeMySQL , updateEmployeeSQl} = require("../repositories/employee.query")
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


      // Thực thi SQL Server
      const sqlRequest = pool
        .request()
        .input("FullName", dataSQL.FullName)
        .input("DateOfBirth", new Date(dataSQL.DateOfBirth))
        .input("PhoneNumber", dataSQL.PhoneNumber)
        .input("Gender", dataSQL.Gender)
        .input("Email", dataSQL.Email)
        .input("HireDate", new Date(dataSQL.HireDate).toLocaleDateString())
        .input("DepartmentID", dataSQL.DepartmentID)
        .input("PositionID", dataSQL.PositionID)
        .input("Status", dataSQL.Status);
      const sqlResult = await sqlRequest.query(insertEmployeeSQl);

      // Thực thi MySQL
      const [mysqlResult] = await mysqlConnection.query(insertEmployeeMysql, [
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
    async getEmployeeByEmail(email, cb) {
        try {
        const pool = await getSqlServerPool();
        const { recordset } = await pool.query(
            `SELECT * FROM Employees WHERE Email = '${email}'`
        );
       console.log("recordset", recordset.length);
        // Kiểm tra xem có nhân viên nào không
        if (recordset.length !== 0) {
            cb(null,{});
        }else{
          cb(null, recordset );
        }
        } catch (error) {
        cb(error, null);
        }
    },
    async deleteEmployeeByEmail(Email, cb) {
      try {
          const pool = await getSqlServerPool(); // SQL Server connection
  
          // 1. Kiểm tra nhân viên có tồn tại trong SQL Server
          const { recordset } = await pool.request()
              .input("Email", `%${Email}%`)  // Sử dụng LIKE cho email
              .query(`SELECT EmployeeID, FullName FROM Employees WHERE Email LIKE @Email`);
  
          // Kiểm tra nếu không tìm thấy nhân viên trong SQL Server
          if (recordset.length === 0) {
              return cb( { message: "Không tìm thấy nhân viên với Email này trong SQL Server." } , null);
          }
  
          const fullName = recordset[0].FullName;  
          const EmployeeID = recordset[0].EmployeeID;
  
          // 2. Kiểm tra nhân viên có tồn tại trong MySQL
          const [mysqlResult] = await mysqlConnection.execute(
              `SELECT EmployeeID, FullName FROM employees WHERE FullName LIKE ?`, 
              [`%${fullName}%`]  // Truyền tham số FullName vào MySQL
          );
  
          // Kiểm tra nếu không tìm thấy nhân viên trong MySQL
          if (mysqlResult.length === 0) {
              return cb({ message: "Không tìm thấy nhân viên với FullName này trong MySQL." } , null);
          }
  
          // 3. Xóa các bản liên quan trong SQL Server (Devidend)
          await pool.request()
              .input("EmployeeID" ,EmployeeID)
              .query(`DELETE FROM Dividends WHERE EmployeeID = @EmployeeID`);
  
          // 4. Xóa các bản liên quan trong MySQL (attendance, salaries)
          await mysqlConnection.execute(`DELETE FROM attendance WHERE EmployeeID = ?`, [EmployeeID]);
          await mysqlConnection.execute('DELETE FROM salaries WHERE EmployeeID = ?', [EmployeeID]);
  
          // 5. Xóa nhân viên trong SQL Server
          await pool.request()
              .input("Email",`%${Email}%`)
              .query(`DELETE FROM Employees WHERE Email LIKE @Email`);
  
          // 6. Xóa nhân viên trong MySQL
          await mysqlConnection.execute(`DELETE FROM employees WHERE FullName LIKE ?`, [`%${fullName}%`]);
  
          cb( { message: "Xóa nhân viên thành công." } , null);
      } catch (error) {
        console.error("Error deleting employee:", error);
          cb(error, null);
      }
  },
  async updateEmployeeById( {EmployeeId ,FullName , DateOfBirth, PhoneNumber, HireDate, DepartmentID, PositionID, Status, Email , Gender},  cb){
     try {

        const pool = await getSqlServerPool();
        const sqlRequest = pool.request()
            .input("EmployeeId", EmployeeId)
            .input("FullName", FullName)
            .input("DateOfBirth", new Date(DateOfBirth))
            .input("PhoneNumber", PhoneNumber)
            .input("HireDate", new Date(HireDate))
            .input("DepartmentID", DepartmentID)
            .input("PositionID", PositionID)
            .input("Status", Status)
            .input("Email", Email)
            .input("Gender" , Gender)
        const sqlResult = await sqlRequest.query(updateEmployeeSQl);

        const [mysqlResult] = await mysqlConnection.query(updateEmployeeMySQL, [
         
           FullName,
           DepartmentID,
            PositionID,
            Status,
            EmployeeId,
        ]);

        cb(null, {sqlResult, mysqlResult});

     } catch (error) {
        console.error("Error updating employee:", error);
        cb(error, null);
     }
  },
  async searchEmployee({ EmployeeID, FullName, DepartmentID, PositionID }, cb) {
    try {
      const pool = await getSqlServerPool();
      const mysqlConnection = await getMySQLConnection(); // (giả sử bạn có sẵn hàm này)
  
      const sqlQuery = `
        SELECT * FROM Employees WHERE 1=1
        ${EmployeeID ? `AND EmployeeID = '${EmployeeID}'` : ""}
        ${FullName ? `AND FullName LIKE '%${FullName}%'` : ""}
        ${DepartmentID ? `AND DepartmentID = '${DepartmentID}'` : ""}
        ${PositionID ? `AND PositionID = '${PositionID}'` : ""}
      `;
      const mysqlQuery = `
        SELECT * FROM employees WHERE 1=1
        ${EmployeeID ? `AND EmployeeID = '${EmployeeID}'` : ""}
        ${FullName ? `AND FullName LIKE '%${FullName}%'` : ""}
        ${DepartmentID ? `AND DepartmentID = '${DepartmentID}'` : ""}
        ${PositionID ? `AND PositionID = '${PositionID}'` : ""}
      `;
      // Query SQL Server
      const { recordset } = await pool.query(sqlQuery);
  
      // Query MySQL
      const [mysqlRows] = await mysqlConnection.query(mysqlQuery);
  
      // Gộp dữ liệu
      const mergedData = recordset.map((row) => {
        const mySQLEmployee = mysqlRows.find((emp) => emp.EmployeeID === row.EmployeeID);
  
        if (mySQLEmployee) {
          return {
            EmployeeID: `SS-${row.EmployeeID}`,
            FullName: row.FullName,
            DateOfBirth: row.DateOfBirth,
            PhoneNumber: row.PhoneNumber,
            HireDate: row.HireDate,
            DepartmentID: row.DepartmentID,
            PositionID: row.PositionID,
            Status: row.Status,
            CreatedAt: row.CreatedAt,
            UpdatedAt: row.UpdatedAt,
            // Bạn có thể thêm dữ liệu bên MySQL nếu cần
            Salary: mySQLEmployee.Salary, 
            Bonus: mySQLEmployee.Bonus
          };
        } else {
          return null;
        }
      }).filter(item => item !== null); // Bỏ các phần tử null
  
      cb(null, mergedData);
  
    } catch (error) {
      console.error("Error searching employee:", error);
      cb(error, null);
    }
  }
};

module.exports = employeeModel;
