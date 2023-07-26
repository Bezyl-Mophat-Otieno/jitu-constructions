const express = require ('express');
const { projectrouter } = require('./Routes/projectRoutes');
const {connect} = require ('./config/config')
const mssql = require('mssql')
const {sqlConfig} = require('./config/config')
require('dotenv').config();


const app  = express()

app.use(express.json())
app.use('/project', projectrouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})

app.listen(4500, async()=>{
    
    try {
        
        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            console.log('Database connected successfully');
        }else{
            console.log('Database connection failed');
        }
        console.log('Server running on port 4500');
    } catch (error) {
        console.log(error);
        
    }

})