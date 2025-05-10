const {authMysqlConnection}  = require("../config/config")
const {getUserbyAccountQuery} = require("../repositories/auth.query")
const authUserModel = {
    async getUserByEmail( email , cb){
     
        try {
            const [user] = await  authMysqlConnection.query(getUserbyAccountQuery, [email ]);
            cb(null, user[0]);
        } catch (error) {
            cb(error, null);
        }
    }

}
module.exports = authUserModel;