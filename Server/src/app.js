const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port  = 4000;
const routes = require("./routes/index")
const {getSqlServerPool , mysqlConnection} = require ("./config/config")
const corsOptions = {
    origin: 'http://localhost:3000', // Đảm bảo URL này khớp với frontend của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Nếu bạn đang gửi cookie hoặc xác thực
  };
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

routes(app)



app.listen(port, ()=>{  
  // test SQL Server connection
  getSqlServerPool()
  .then(async (pool) => {
    try {
      const result = await pool.request().query('SELECT TOP 1 * FROM YourTableName'); // Thay 'YourTableName' bằng bảng có thật
      console.log('SQL Server test query result:', result.recordset);
    } catch (err) {
      console.error('Error executing SQL Server query:', err);
    }
  })
  .catch((err) => {
    console.error('Error getting SQL Server pool:', err);
  });

  

    console.log(`listening sucessful port ${port}`)
   
})