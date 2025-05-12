
    const featureRoles = {
        dashboard : ["Admin" ,"HR_Manager"  , "Payroll_Manager"],
        human: {
            view:["Admin" ,"HR_Manager"  , "Payroll_Manager"],
            add:["Admin" ,"HR_Manager"],
            edit:["Admin" ,"HR_Manager"],
            delete:["Admin" ,"HR_Manager"]
        },
        payroll: ["Admin" ,"HR_Manager"  , "Payroll_Manager"],
        department:["Admin" ,"HR_Manager" , "Payroll_Manager"],
        notification:["Admin" ,"HR_Manager" , "Payroll_Manager"],
        profile: ["Employee"],
        
    }
export default featureRoles;