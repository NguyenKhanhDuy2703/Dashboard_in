 // định nghia các route theo chức năng 
 
 const employee = require("./employee")
function routes(app) {
 app.use("/" ,employee)

}
module.exports = routes;
