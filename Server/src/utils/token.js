const jwt = require("jsonwebtoken")
require("dotenv").config()
const secretkey = process.env.JWT_SECRET;
const saltRounds = process.env.SALT_ROUNDS;

// function rederToken by userName , password and role
const renderToken = (data) => {
    const token = jwt.sign(data, secretkey, {
        expiresIn: "2h",
    });
    return token;
};
// function verifyToken by token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretkey);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = {
    renderToken,
    verifyToken,
};