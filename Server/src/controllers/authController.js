const authUserModel = require("../models/authUser.model")
const { renderToken } = require("../utils/token")
// request , response
const LoginController =   async( req , res) => {

    try {
        const { email , password } = req.body
        console.log(email , password)
    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required"
        })
    }
    // model
   await authUserModel.getUserByEmail( email , (err , data) =>{
        if(err){
            return res.status(500).json({
                message: err.message 
            })
        }
        if(data.password !== password){
            return res.status(401).json({
                message: "Password is incorrect"
            })
        }   
        const token = renderToken(data);
        res.cookie("sessionToken", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        return res.status(200).json({
            message: "Login success",
            data: data , 
            token: token
        })
    })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }


}

module.exports = {
    LoginController
}