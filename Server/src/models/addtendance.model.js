const { console } = require("inspector");
const {getSqlServerPool , mysqlConnection} = require("../config/config")
const addAttendanceModel = {
    async getAllAttendance(cb) {
        try {
            const query = `
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
            `;
            const pool = await getSqlServerPool();
            const resultSQLDepartment = await pool.request().query("SELECT * FROM Employees");

            const [rows] = await mysqlConnection.query(query);
            const merger = resultSQLDepartment.recordset.map((item) => {
                const mysqlEmployee = rows.find(
                    (row) => row.EmployeeID === item.EmployeeID && row.FullName === item.FullName
                );
                if (mysqlEmployee) {
                    return {
                        ...item,
                        DepartmentName: mysqlEmployee.DepartmentName,
                        PositionName: mysqlEmployee.PositionName,
                        WorkDays: mysqlEmployee.WorkDays,
                        AbsentDays: mysqlEmployee.AbsentDays,
                        LeaveDays: mysqlEmployee.LeaveDays,
                        AttendanceMonth: mysqlEmployee.AttendanceMonth,
                        Status: mysqlEmployee.Status
                    };
                } else {
                    return null;
                }
            }).filter((item) => item !== null); // ✅ đúng: filter
            cb(null, { attendance: merger });
        }catch (error) {
            console.error("Error fetching attendance:", error.message);
            cb(error, null);
        }
    }
}
module.exports = addAttendanceModel;

