const {getSqlServerPool , mysqlConnection} = require ("../config/config")
// tạo model để tương tác với database
// model sẽ chứa các hàm để tương tác với database
// model sẽ lấy dữ liệu và trả về cho controller thông qua callback
const employeeModel  = {
    getAllEmployees : async (cb) => {
       
        try {
            // Kết nối đến SQL Server
            const pool = await getSqlServerPool();
            // Thực hiện truy vấn SQL Server
            const resultSQL = await pool.request().query('SELECT * FROM Employees');
            const [resultMySQL] = await mysqlConnection.query('SELECT * FROM payroll.employees');
            // trả dữ liệu về cho controller thông qua callback
            cb(null, {resultMySQL  , resultSQL });
        } catch (error) {
            console.error('Error fetching employees:', error);
            cb(error, null);
        }
    }
       
 }
module.exports = employeeModel