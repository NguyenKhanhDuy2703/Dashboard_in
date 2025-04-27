const {authMysqlConnection}  = require("../config/config")
const {getUserbyAccountQuery} = require("../repositories/auth.query")
const authUserModel = {
    async getUserByAccount ( account , cb){
     
        try {
            const [user] = await  authMysqlConnection.query(getUserbyAccountQuery, [account ]);
            cb(null, user[0]);
        } catch (error) {
            cb(error, null);
        }
    }

}
module.exports = authUserModel;