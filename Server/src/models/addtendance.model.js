const { console } = require("inspector");
const {getSqlServerPool , mysqlConnection} = require("../config/config")
const addAttendanceModel = {
  async getAllAttendance({ limit, page }, cb) {
    try {
      const offset = (page - 1) * limit;

      const dataQuery = `
        SELECT 
          em.EmployeeID,
          em.FullName,
          de.DepartmentName,
          po.PositionName,
          at.WorkDays,
          at.AbsentDays,
          at.LeaveDays,
          at.AttendanceMonth,
          em.Status
        FROM employees em
        JOIN departments de ON em.DepartmentID = de.DepartmentID
        JOIN positions po ON em.PositionID = po.PositionID
        JOIN attendance at ON em.EmployeeID = at.EmployeeID
        LIMIT ? OFFSET ?
      `;

      const countQuery = `
        SELECT COUNT(*) AS total FROM attendance
      `;

      // Lấy dữ liệu từ SQL Server
      const pool = await getSqlServerPool();
      const resultSQLDepartment = await pool.request().query("SELECT * FROM Employees");

      // Đếm tổng số dòng trong bảng attendance
      const [countResult] = await mysqlConnection.query(countQuery);
      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / limit);

      // Lấy dữ liệu từ MySQL với LIMIT/OFFSET
      const [rows] = await mysqlConnection.query(dataQuery, [parseInt(limit), parseInt(offset)]);

      // Hợp nhất dữ liệu
      const merger = resultSQLDepartment.recordset.map((item) => {
        const mysqlEmployee = rows.find(
          (row) => row.EmployeeID === item.EmployeeID && row.FullName === item.FullName
        );

        if (mysqlEmployee) {
          return {
            EmployeeID: item.EmployeeID,
            FullName: item.FullName,
            DepartmentName: mysqlEmployee.DepartmentName,
            PositionName: mysqlEmployee.PositionName,
            WorkDays: mysqlEmployee.WorkDays,
            AbsentDays: mysqlEmployee.AbsentDays,
            LeaveDays: mysqlEmployee.LeaveDays,
            AttendanceMonth: new Date(mysqlEmployee.AttendanceMonth).toLocaleDateString("vi-VN"),
            Status: mysqlEmployee.Status
          };
        } else {
          return null;
        }
      }).filter((item) => item !== null);

      cb(null, {
        attendance: merger,
        currentPage: parseInt(page),
        totalPages: totalPages
      });
    } catch (error) {
      console.error("Error fetching attendance:", error.message);
      cb(error, null);
    }
  }
}


module.exports = addAttendanceModel;

