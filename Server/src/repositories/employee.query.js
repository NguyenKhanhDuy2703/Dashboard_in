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

const getAllEmployeesSQL = `
  SELECT
    e.EmployeeID,
    e.FullName,
    e.DateOfBirth,
    e.PhoneNumber,
    e.Gender,
    e.Email,
    e.HireDate,
    e.DepartmentID,
    d.DepartmentName,
    e.PositionID,
    p.PositionName,
    e.Status
  FROM Employees e
  JOIN Departments d ON e.DepartmentID = d.DepartmentID
  JOIN Positions p ON e.PositionID = p.PositionID
  ORDER BY e.EmployeeID
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY
`;
const getEmployeesByIDSQL = `
  SELECT
    e.EmployeeID,
    e.FullName,
    e.DateOfBirth,
    e.PhoneNumber,
    e.Gender,
    e.Email,
    e.HireDate,
    e.DepartmentID,
    d.DepartmentName,
    e.PositionID,
    p.PositionName,
    e.Status
  FROM Employees e
  JOIN Departments d ON e.DepartmentID = d.DepartmentID
  JOIN Positions p ON e.PositionID = p.PositionID
    WHERE e.EmployeeID = @EmployeeId
`;


// mysql query
const insertEmployeeMysql = `   INSERT INTO employees (EmployeeID ,FullName, DepartmentID, PositionID) VALUES (?, ?, ? , ?)`
const updateEmployeeMySQL = `
            UPDATE employees
            SET  FullName = ?, DepartmentID = ?, PositionID = ? , Status = ?
            WHERE EmployeeID = ?
        `
const getAllEmployeesMySQL = `
  SELECT 
    e.EmployeeID, 
    e.FullName, 
    e.DepartmentID, 
    d.DepartmentName, 
    e.PositionID, 
    p.PositionName 
  FROM employees e
  JOIN departments d ON e.DepartmentID = d.DepartmentID
  JOIN positions p ON e.PositionID = p.PositionID
`;
module.exports = {
    insertEmployeeSQl,
    insertEmployeeMysql , 
    updateEmployeeSQl , 
    updateEmployeeMySQL,
    getAllEmployeesSQL , 
    getAllEmployeesMySQL,
    getEmployeesByIDSQL
}