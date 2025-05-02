const express = require('express');
const router = express.Router();
const  {notificationAniController , leaveViolationController} = require("../controllers/notificaitonController")
router.get('/Ani', notificationAniController)
router.get('/leave_violation' , leaveViolationController)

module.exports = router;