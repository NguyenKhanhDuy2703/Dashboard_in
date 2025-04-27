const express = require('express');
const { LoginController } = require('../controllers/authController');
const router = express.Router();

// router include path , controller
router.post("/login" , LoginController )



module.exports = router;