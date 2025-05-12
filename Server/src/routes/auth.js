const express = require('express');
const { LoginController } = require('../controllers/authController');
const router = express.Router();

// router include path , controller
router.post("/login" , LoginController )
router.get("/logout" , (req , res) => {
    res.clearCookie("sessionToken");
    return res.status(200).json({
        message: "Logout success"
    })
})



module.exports = router;