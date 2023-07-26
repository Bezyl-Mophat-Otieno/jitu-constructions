CREATE OR ALTER PROCEDURE updateProject
    @id VARCHAR(200),
    @project_name varchar(500),
    @project_location varchar(200),
    @description varchar(1000),
    @startDate date,
    @endDate date
    AS BEGIN
    UPDATE project SET
        id = @id,
        project_name = @project_name,
        project_location = @project_location,
        description = @description,
        startDate = @startDate,
        endDate = @endDate
    WHERE id = @id
    END;

    GO 

    SELECT * FROM project;