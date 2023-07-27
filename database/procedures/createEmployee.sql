-- create employee procedure

CREATE OR ALTER PROCEDURE createEmployee
   @id VARCHAR(200),
    @e_name VARCHAR(500),
    @email  VARCHAR(200)   ,
    @password VARCHAR(500)
    AS BEGIN
    INSERT INTO employeesTable (id, e_name, email, password) VALUES(
        @id,
        @e_name,
        @email,
        @password
        
    )
    END;

    SELECT * FROM employeesTable;