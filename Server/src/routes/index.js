const auth = require('./auth');
const employee = require('./employee');
const department = require('./department');
const payroll = require('./payroll');
const attendance = require('./attendance');
const  notification = require('./notification');
const { authenticationToken , authenticatioRole } = require ("../middleware/auth/authentication")
const report = require('./report')
function routes(app) {
app.use('/api/auth', auth);
app.use('/api/employee',authenticationToken ,  employee);
app.use('/api/department',authenticationToken ,authenticatioRole(["Admin" ,"HR_Manager" , "Employee" , "Payroll_Manager"]) , department)
app.use('/api/payroll',authenticationToken  ,  payroll)
app.use('/api/attendance', authenticationToken ,authenticatioRole(["Admin" ,"HR_Manager" , "Payroll_Manager"]), attendance);
app.use('/api/notification',authenticationToken ,authenticatioRole(["Admin" ,"HR_Manager" , "Employee" , "Payroll_Manager"]) ,notification);
app.use('/api/report',authenticationToken ,authenticatioRole(["Admin" ,"HR_Manager" , "Employee" , "Payroll_Manager"]) ,  report)
app.get('/api/get-token',authenticationToken,authenticatioRole(["Admin" , "Employee" , "HR_Manager" , "Payroll_Manager"]),(req, res) => {
     return res.status(200).json({
        message: "Get token success",
        user: req.data
     })
})
}
module.exports = routes;
