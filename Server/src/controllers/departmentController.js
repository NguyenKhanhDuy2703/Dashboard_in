const departmentModel = require("../models/department.model");

const getDepartmentsController = (req, res) => {

    departmentModel.getAllDepartments((err, result) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).json({ error: 'Error fetching departments' });
        }
        res.status(200).json(result);
    });
}

module.exports = {
    getDepartmentsController
}