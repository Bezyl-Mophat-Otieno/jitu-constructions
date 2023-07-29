 const mssql = require('mssql')
 const {sqlConfig} = require('../config/config')

 // a sigleton class to handle a connection and the execution of queries 
 class DB {
    static async exec(procedureName , data={}){

        const pool = await mssql.connect(sqlConfig)
        const request = await pool.request()

        for (key in data){
            request.input(key, data[key])
        }
        const result = await request.execute(procedureName)

         return result
    }
 }

 module.exports = DB