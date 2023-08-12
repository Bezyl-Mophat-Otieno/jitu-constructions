CREATE OR ALTER PROCEDURE mailingList
    AS BEGIN
    SELECT * FROM employeesTable where isSent = 1
    END;
