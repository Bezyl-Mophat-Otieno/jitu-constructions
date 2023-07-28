CREATE PROCEDURE mailingList
    AS BEGIN
    SELECT * FROM employeesTable where isSent =0 
    END;
