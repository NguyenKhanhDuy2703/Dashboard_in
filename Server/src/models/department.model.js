const { getSqlServerPool, mysqlConnection } = require('../config/config'); 

const departmentModel = {
    async getAllDepartments (cb) {
        try {
            // Kết nối đến SQL Server
            const pool = await getSqlServerPool();
            const resultSQLDepartment = await pool.request().query('SELECT DepartmentID, DepartmentName FROM Departments');
            const resultSQLPosition = await pool.request().query('SELECT PositionID, PositionName FROM Positions');
            // Kết nối đến MySQL
            const [rows] = await mysqlConnection.query('SELECT DepartmentID, DepartmentName FROM Departments');
            const [rows1] = await mysqlConnection.query('SELECT PositionID, PositionName FROM Positions');
            // merge data from SQL Server and MySQL
            const mergedDepartments =  resultSQLDepartment.recordset.map((item) => {
                const mysqlDepartment = rows.find((row) => row.DepartmentID === item.DepartmentID);
                return {
                    ...item,
                    DepartmentName: mysqlDepartment ? mysqlDepartment.DepartmentName : item.DepartmentName
                };
            });
            // merge data from SQL Server and MySQL
            const mergedPositions = resultSQLPosition.recordset.map((item) => {
                const mysqlPosition = rows1.find((row) => row.PositionID === item.PositionID);
                return {
                    ...item,
                    PositionName: mysqlPosition ? mysqlPosition.PositionName : item.PositionName
                };
            });
           

            cb(null, {
                departments: mergedDepartments,
                positions: mergedPositions
            });

        } catch (error) {
            console.error('Error fetching departments and positions:', error);
            cb(error, null);
        }
    }
};

module.exports = departmentModel;
