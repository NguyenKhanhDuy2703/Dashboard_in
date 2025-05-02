const notificationModel = require("../models/notification.model");
const notificationAniController = (req , res ) => {
    try {
        notificationModel.notificationAni((error, result) => {  
            if(error){
                console.error("Error in notificationAniController:", error.message);
                return res.status(400).json(error.message);
            }
            if(result.length === 0){
                return res.status(200).json({message: "No employees found with today's date"})
            }
            res.status(200).json(result);
        })
    } catch (error) {
        console.error("Error in notificationController:", error.message);
        res.status(500).json({ error: "Internal server error" });   
    }
    
}
const leaveViolationController = (req , res ) => {
    try {
        notificationModel.leaveViolation((error, result) => {  
            if(error){
                console.error("Error in leaveViolationController:", error.message);
                return res.status(400).json(error.message);
            }
            if(result.length === 0){
                return res.status(200).json({message: "No employees found with today's date"})
            }
            res.status(200).json(result);
        })
    } catch (error) {
        console.error("Error in leaveViolationController:", error.message);
        res.status(500).json({ error: "Internal server error" });   
    }
    
}
module.exports = {notificationAniController , leaveViolationController};