IF OBJECT_ID('sp_InsertEmployee', 'P') IS NOT NULL
    DROP PROCEDURE sp_InsertEmployee;
GO

CREATE PROCEDURE sp_InsertEmployee
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @DepartmentID INT,
    @Salary DECIMAL(10,2),
    @JoinDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Employees (FirstName, LastName, DepartmentID, Salary, JoinDate) -- [cite: 498]
    VALUES (@FirstName, @LastName, @DepartmentID, @Salary, @JoinDate); -- [cite: 498]
END;
GO