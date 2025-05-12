const  reportModel = require("../models/report.model")

const EmployeeByGroupDepartmentController = (req , res) => {
        try {
            reportModel.countEmployeeByGroupDepartment(  (err , data) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message
                    })
                }
                if (data.length === 0) {
                    return res.status(404).json({
                        message: "No data found"
                    })
                }
                return res.status(200).json({
                    message: "Get employee by group department success",
                    data: data
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
            
        }
}

const EmployeeByGroupJobController = (req , res) => {
    try {
        reportModel.countEmployeeByGroupJob( (err , data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No data found"
                })
            }
            return res.status(200).json({
                message: "Get employee by group job success",
                data: data
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

const EmployeeByGroupStatusController = (req , res) => {
    try {
        reportModel.countEmployeeByGroupStatus( (err , data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No data found"
                })
            }
            return res.status(200).json({
                message: "Get employee by group status success",
                data: data
            })
        })
   

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }

}

const EmployeeByGroupAttendanceMonthController = (req , res) => {
    try {
        reportModel.countEmployeeByGroupAttendanceMonth( (err , data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No data found"
                })
            }
            return res.status(200).json({
                message: "Get employee by group attendance month success",
                data: data
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }

}

const TotalSalaryByGroupDepartmentController = (req , res) => {
    try {
        reportModel.totalSalaryByGroupDepartment( (err , data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No data found"
                })
            }
            return res.status(200).json({
                message: "Get total salary by group department success",
                data: data
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }

}
const TotalNetSalaryByGroupBySalaryMonthController = (req , res) => {
    try {
        reportModel.totalNetSalaryByGroupBySalaryMonth( (err , data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No data found"
                })
            }
            return res.status(200).json({
                message: "Get total salary by group by salary month success",
                data: data
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}
const TotalBsBoDeBySalaryMonthController = (req , res) => {
    try {
        reportModel.totalBsBoDeBySalaryMonth( (err , data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No data found"
                })
            }
            return res.status(200).json({
                message: "Get total salary by group by salary month success",
                data: data
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}
const TotalEmployeeAndSalaryController = (req , res) => {
    try {
        reportModel.totalEmployeeAndSalary( (err , data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            if (data.length === 0) {
                return res.status(404).json({
                    message: "No data found"
                })
            }
            return res.status(200).json({
                message: "Get total employee and salary success",
                data: data
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}




module.exports = {
    EmployeeByGroupDepartmentController,
    EmployeeByGroupJobController,
    EmployeeByGroupStatusController,
    EmployeeByGroupAttendanceMonthController,
    TotalSalaryByGroupDepartmentController,
    TotalNetSalaryByGroupBySalaryMonthController,
    TotalBsBoDeBySalaryMonthController ,
    TotalEmployeeAndSalaryController
    
}