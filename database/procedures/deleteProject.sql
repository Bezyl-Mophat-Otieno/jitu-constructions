CREATE OR ALTER PROCEDURE deleteProject
    @id VARCHAR(200)
    AS BEGIN
    DELETE FROM project WHERE id = @id
    END;