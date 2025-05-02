const { it } = require("node:test");
const { getSqlServerPool, mysqlConnection } = require("../config/config");
const notificationModel = {
   async notificationAni ( cb) {
        try {
            // lay ngay hien tai 
            const today = new Date();
            const day =today.getDate()
            const month = today.getMonth() + 1; // Tháng bắt đầu từ 0
            // Kết nối đến SQL Server
            const pool = await getSqlServerPool();
            const queryFindNV = `
                    SELECT   EmployeeID, FullName, Email, HireDate
                    FROM Employees
                    WHERE MONTH(HireDate) = @month AND DAY(HireDate) = @day
                `;
            const resultSQL = await pool.request()
                .input("month", month)
                .input("day", day)
                .query(queryFindNV);
            const sqlEmployees = resultSQL.recordset;

            // Kết nối đến MySQL

            const getListEmployee = `SELECT * FROM Employees `;
            const [rows] = await mysqlConnection.query(getListEmployee);
            
            //kiem tra nhan vien có trong mysql hay không 
            const mergedEmployees = sqlEmployees
                .map((item) => {
                    const mysqlEmployee = rows.find(
                        (row) =>  row.FullName === item.FullName
                    );
                    if (mysqlEmployee) {
                        return {
                            ...item,
                           Email : item.Email,
                           FullName: item.FullName,
                           DepartmentName: mysqlEmployee.DepartmentName,
                            PositionName: mysqlEmployee.PositionName,
                        
                        };
                    } else {
                        return null;
                    }
                })
                .filter((item) => item !== null); 
        
                cb(null, mergedEmployees );
        } catch (error) {
            cb(error, null);
            
        }
    },
    async leaveViolation ( cb) {
        try {
            const maxLeaveDays = 3; // số ngày nghỉ phép tối đa
            // get số ngày nghỉ phép của nhân viên
            const getLeaveDaysMysql = `SELECT * FROM employees join attendance on employees.EmployeeID = attendance.EmployeeID  WHERE LeaveDays > ${maxLeaveDays}`;
            const [rows] = await mysqlConnection.query(getLeaveDaysMysql);
            console.log("rows", rows);
            cb(null, rows);
        } catch (error) {
            cb(error, null);
            
        }
    }
}
module.exports = notificationModel