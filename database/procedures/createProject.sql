CREATE OR ALTER PROCEDURE createProject
    @id VARCHAR(200),
    @project_name varchar(500),
    @project_location varchar(200),
    @description varchar(1000),
    @startDate date,
    @endDate date
    AS BEGIN
    INSERT INTO project (id, project_name, project_location, description, startDate, endDate) VALUES(
        @id,
        @project_name,
        @project_location,
        @description,
        @startDate,
        @endDate
    )
    END;

GO
    SELECT * FROM project;
    
    

