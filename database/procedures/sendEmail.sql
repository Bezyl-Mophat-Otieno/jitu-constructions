CREATE OR ALTER PROCEDURE sendEmail
@email VARCHAR(200)
AS BEGIN

UPDATE employeesTable 
SET isSent = 1
WHERE email = @email;
END;
 