const express = require('express');
const router = express.Router();
const {getAllAttendanceController} = require("../controllers/attendanceController")

router.get('/list-attendance', getAllAttendanceController)

module.exports = router;