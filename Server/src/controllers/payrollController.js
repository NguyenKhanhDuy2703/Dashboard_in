const payrollModel = require('../models/payroll.model');

const getAllPayrollController = (req, res) => {
    const { page, limit  , monthSalary} = req.query;
    console.log("monthSalary", monthSalary);
    payrollModel.getAllPayrollFollowingEmployee( {page, limit  , monthSalary} , (err, result) => {
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
            data : result
           }
           );
    });
};

const getPayrollbyEmployeeController = (req, res) => {
        const {id } = req.query
        try {
            payrollModel.getEmployeeById(id, (err, result) => {
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
                    payrolls : result
                   }
                   );
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching attendance' });
        }
    
    
    }
const updatePayrollByEmployID = (req, res) => {
    const { Bonus, Deductions , EmployeeID } = req.body;
  
    payrollModel.updatePayrollByEmployID({EmployeeID, Bonus, Deductions}, (err, result) => {
      if (err) {
        console.error('Error updating payroll:', err);
        return res.status(500).json({ error: 'Error updating payroll' });
      }
      res.status(200).json({
        message: 'Update payroll successfully',
        result: result,
      });
    });
  };



module.exports = {
    getAllPayrollController,
    getPayrollbyEmployeeController ,
    updatePayrollByEmployID
};
