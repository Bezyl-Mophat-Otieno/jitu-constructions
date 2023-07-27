-- login the employee

CREATE OR ALTER PROCEDURE loginEmployee
    @email VARCHAR(200)
    AS BEGIN
    SELECT * FROM employeesTable WHERE email = @email
    END;
