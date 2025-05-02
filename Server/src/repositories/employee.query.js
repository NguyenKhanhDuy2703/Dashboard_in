/// sql server query 
const insertEmployeeSQl = `INSERT INTO Employees
(   FullName, DateOfBirth, PhoneNumber, Gender, Email, HireDate, DepartmentID, PositionID, Status , CreatedAt, UpdatedAt)
VALUES
(  @FullName, @DateOfBirth, @PhoneNumber, @Gender, @Email, @HireDate, @DepartmentID, @PositionID, @Status , GETDATE(), GETDATE())`
const updateEmployeeSQl = `
            UPDATE Employees
            SET DateOfBirth = @DateOfBirth,
                PhoneNumber = @PhoneNumber,
                FullName = @FullName,
                HireDate = @HireDate,
                DepartmentID = @DepartmentID,
                PositionID = @PositionID,
                Gender = @Gender,
                Status = @Status,
                Email = @Email
            WHERE EmployeeID = @EmployeeId
        `

// mysql query
const insertEmployeeMysql = `   INSERT INTO employees (EmployeeID ,FullName, DepartmentID, PositionID) VALUES (?, ?, ? , ?)`
const updateEmployeeMySQL = `
            UPDATE employees
            SET  FullName = ?, DepartmentID = ?, PositionID = ? , Status = ?
            WHERE EmployeeID = ?
        `

module.exports = {
    insertEmployeeSQl,
    insertEmployeeMysql , 
    updateEmployeeSQl , 
    updateEmployeeMySQL
}