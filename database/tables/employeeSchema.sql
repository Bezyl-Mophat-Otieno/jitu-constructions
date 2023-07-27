BEGIN TRY
CREATE TABLE employee (
    id VARCHAR(200) PRIMARY KEY,
    e_name VARCHAR(500),
    email VARCHAR(200),
    password VARCHAR(500),
    role VARCHAR(200) DEFAULT 'user',
    isSent Bit DEFAULT 0,
);

END TRY
BEGIN CATCH
    THROW 5001, 'Table already exists',1;
END CATCH
