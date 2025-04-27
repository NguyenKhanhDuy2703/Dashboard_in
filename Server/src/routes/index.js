const auth = require('./auth');
const employee = require('./employee');
const department = require('./department');
const payroll = require('./payroll');
const attendance = require('./attendance');
const { authenticationToken , authenticatioRole } = require ("../middleware/auth/authentication")
function routes(app) {
app.use('/api/auth', auth);
app.use('/api/employee', employee);
app.use('/api/department',department)
app.use('/api/payroll', payroll)
app.use('/api/attendance', attendance);
app.get('/api/get-token',authenticationToken,authenticatioRole(["Admin" , "Employee" , "HR_Manager" , "Payroll_Manager"]),(req, res) => {
     return res.status(200).json({
        message: "Get token success",
        user: req.data
     })
})
}
module.exports = routes;
