const attendanceModel = require('../models/addtendance.model');
const getAllAttendanceController = (req, res) => {
    attendanceModel.getAllAttendance((err, result) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            return res.status(500).json({ error: 'Error fetching attendance' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No attendance records found' });
        }
        res.status(200).json(
           {
            message :'Get attendance successfully',
            attendance : result
           }
           );
    });
}
module.exports = {
    getAllAttendanceController
};