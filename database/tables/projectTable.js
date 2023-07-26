const mssql = require('mssql');
const { v4 } = require('uuid');
const { sqlConfig } = require('../../config/config');


const createProjectTable = async (req,res)=>{
    try {

        const table = `
        CREATE TABLE project(
            id VARCHAR(200) PRIMARY KEY,
            project_name VARCHAR(500) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            project_location VARCHAR(200) NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE NOT NULL

        )`

        const pool = await mssql.connect(sqlConfig)

        pool.request().query(table,(err,result)=>{

            if (err instanceof mssql.RequestError) {
                console.log(err)
            
            }else{
                
                console.log('Table created successfully')
            }

        })
        
    } catch (error) {
        console.log(error)
     return  {Error:error}       
    }
}

module.exports = {createProjectTable}