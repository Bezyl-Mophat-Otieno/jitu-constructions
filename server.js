const express = require ('express');
const { projectrouter } = require('./Routes/projectRoutes');
const { employeeRouter } = require('./Routes/employeeRouter')
const mssql = require('mssql')
const {sqlConfig, getPool} = require('./config/config')
const { connectDB } = require('./config/config');
require('dotenv').config();


const app  = express()

app.use(express.json())
app.use('/project', projectrouter)
app.use('/employee', employeeRouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})

app.listen(4500, async()=>{
    
    try {
        await getPool()
        console.log('Server running on port 4500');
    } catch (error) {
        console.log(error);
        
    }

})