 const mssql = require('mssql')
 const {sqlConfig} = require('../config/config')

 // a sigleton class to handle a connection and the execution of queries 

 class DB {

    


    static async getRequest (){
        let pool = await mssql.connect(sqlConfig)
        return pool.request()

    }

    static async exec(procedureName , data={}){
        // use for in loop to loop through the data object and add the data to the request
        let request = await this.getRequest()
        for(let key in data){
            request.input(key, data[key])
        }
        request.execute(procedureName)
    }
 }

 module.exports = DB