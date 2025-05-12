const express = require('express');
const router = express.Router();
const {getDepartmentsController} = require("../controllers/departmentController");
const { authenticatioRole } = require('../middleware/auth/authentication');

// xây đừng đường dẫn cho route theo từng chức năng

router.get('/list-department', getDepartmentsController)

module.exports = router
