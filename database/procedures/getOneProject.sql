CREATE OR ALTER PROCEDURE getOneProject
    @id VARCHAR(200)
    AS BEGIN
    SELECT * FROM project WHERE id = @id
    END;