const mysql = require('mysql2/promise');
const sql = require('mssql');

// MySQL Connection Pool
const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'duy270304',
  database: 'payroll',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// auth connection Mysql
const authMysqlConnection = mysql.createPool({
  host: 'localhost',
  user:"root",
  password:"duy270304",
  database:"authDashboard",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})



// SQL Server Config
const sqlServerConfig = {
  user: "sa",
  password: "duy270304",
  database: "HUMAN",
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// SQL Server Pool Holder
let sqlServerPool;

// Hàm tái sử dụng kết nối SQL Server
async function getSqlServerPool() {
  if (!sqlServerPool) {
    try {
      sqlServerPool = await sql.connect(sqlServerConfig);
      console.log('Connected to SQL Server');
    } catch (err) {
      console.error('Error connecting to SQL Server:', err);
      throw err;
    }
  }
  return sqlServerPool;
}



module.exports = {
  mysqlConnection,
  getSqlServerPool,
  authMysqlConnection
};
