IF OBJECT_ID('sp_GetEmployeeCountByDept', 'P') IS NOT NULL
    DROP PROCEDURE sp_GetEmployeeCountByDept;
GO

CREATE PROCEDURE sp_GetEmployeeCountByDept
    @DepartmentID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(EmployeeID) AS TotalEmployees 
    FROM Employees 
    WHERE DepartmentID = @DepartmentID; 
END;
GO