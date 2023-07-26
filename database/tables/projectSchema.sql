BEGIN TRY
CREATE TABLE project (
    id VARCHAR(200) PRIMARY KEY,
    project_name varchar(500),
    project_location varchar(200),
    description varchar(1000),
    startDate date,
    endDate date
);

END TRY
BEGIN CATCH
    THROW 5001, 'Table already exists',1;
END CATCH
