const {getSqlServerPool , mysqlConnection} = require('../config/config');
const reportModel = {
    async countEmployeeByGroupDepartment( cb){
        try {
            // dem sl nhan vien theo phong ban SqlServer
            const sql = `SELECT d.DepartmentName, COUNT(e.EmployeeID) AS EmployeeCount
            FROM Employees e
            JOIN Departments d ON e.DepartmentID = d.DepartmentID
            GROUP BY d.DepartmentName`;
            const pool = await getSqlServerPool();
            const result = await pool.request().query(sql);

            // dem sl nhan vien theo phong ban MySQL
            const sqlMySQL = `SELECT d.DepartmentName, COUNT(e.EmployeeID) AS EmployeeCount
            FROM Employees e
            JOIN Departments d ON e.DepartmentID = d.DepartmentID
            GROUP BY d.DepartmentName`;
            const [rows] = await mysqlConnection.query(sqlMySQL);
             
            // merge 2 ket qua
            const mergerData = result.recordset.map((item) => {
                const mysqlData = rows.find((row) => row.DepartmentName === item.DepartmentName);
                return {
                    DepartmentName: item.DepartmentName,
                    EmployeeCount: item.EmployeeCount ,
                };
            });
            cb(null, mergerData);
            

    


        } catch (error) {
            cb(error, null);
        }

    } ,
    async countEmployeeByGroupJob(cb){
        try {
            // dem sl nhan vien theo chuc vu SqlServer
            const sql = `SELECT p.PositionName, COUNT(e.EmployeeID) AS EmployeeCount
            FROM Employees e
            JOIN Positions p ON e.PositionID = p.PositionID
            GROUP BY p.PositionName`;
            const pool = await getSqlServerPool();
            const result = await pool.request().query(sql);

            // dem sl nhan vien theo chuc vu MySQL
            const sqlMySQL = `SELECT p.PositionName, COUNT(e.EmployeeID) AS EmployeeCount
            FROM Employees e
            JOIN Positions p ON e.PositionID = p.PositionID
            GROUP BY p.PositionName`;
            const [rows] = await mysqlConnection.query(sqlMySQL);
             
            // merge 2 ket qua
            const mergerData = result.recordset.map((item) => {
                const mysqlData = rows.find((row) => row.PositionName === item.PositionName);
                return {
                    PositionName: item.PositionName,
                    EmployeeCount: item.EmployeeCount ,
                };
            });
            cb(null, mergerData);
            

        } catch (error) {
            cb(error, null);
        }

    } ,
    async countEmployeeByGroupStatus (cb) {
        try {
            // dem sl nhan vien theo trang thai SqlServer
            const sql = `SELECT e.Status, COUNT(e.EmployeeID) AS EmployeeCount
            FROM Employees e
            GROUP BY e.Status`;
            const pool = await getSqlServerPool();
            const result = await pool.request().query(sql);

            // dem sl nhan vien theo trang thai MySQL
            const sqlMySQL = `SELECT e.Status, COUNT(e.EmployeeID) AS EmployeeCount
            FROM Employees e
            GROUP BY e.Status`;
            const [rows] = await mysqlConnection.query(sqlMySQL);
             
            // merge 2 ket qua
            const mergerData = result.recordset.map((item) => {
                const mysqlData = rows.find((row) => row.Status === item.Status);
                return {
                    Status: item.Status,
                    EmployeeCount: item.EmployeeCount ,
                };
            });
            cb(null, mergerData);
            

        } catch (error) {
            cb(error, null);
        }

    },
    async countEmployeeByGroupAttendanceMonth (cb) {
        try {

            // dem sl nhan vien theo trang thai MySQL
            const sqlMySQL = `SELECT a.AttendanceMonth, COUNT(e.EmployeeID) AS EmployeeCount
            FROM Employees e
            JOIN Attendance a ON e.EmployeeID = a.EmployeeID
            GROUP BY a.AttendanceMonth`;
            const [rows] = await mysqlConnection.query(sqlMySQL);
             
           
            cb(null, rows);
            

        } catch (error) {
            cb(error, null);
        }

    } ,
    async totalSalaryByGroupDepartment (cb) {
        try {
           

            // tinh tong luong theo phong ban MySQL
            const sqlMySQL = `SELECT d.DepartmentName, SUM(s.NetSalary) AS TotalSalary
            FROM Employees e
            JOIN Departments d ON e.DepartmentID = d.DepartmentID
            JOIN salaries s ON e.EmployeeID = s.EmployeeID
            GROUP BY d.DepartmentName`;
            const [rows] = await mysqlConnection.query(sqlMySQL); 
            cb(null, rows);
        } catch (error) {
            cb(error, null);
        }
    },
    // tính base salary   Bonus , decution theo tháng
    async totalBsBoDeBySalaryMonth  (cb) {
        try {
            const mysql = `SELECT s.SalaryMonth, SUM(s.BaseSalary) AS TotalBaseSalary, SUM(s.Bonus) AS TotalBonus, SUM(s.Deductions) AS TotalDeduction
            FROM salaries s
            GROUP BY s.SalaryMonth`;
            // mysql
            const [rows] = await mysqlConnection.query(mysql);
            cb(null, rows);

        } catch (error) {
            cb(error, null);
            
        }
    }

    

    
    


}
module.exports = reportModel;