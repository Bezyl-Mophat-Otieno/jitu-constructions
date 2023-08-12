const express = require ('express');
const { projectrouter } = require('./Routes/projectRoutes');
const { employeeRouter } = require('./Routes/employeeRouter')
const {getPool} = require('./config/config')
const cron = require('node-cron');
const { welcomeAboard } = require('./emailing/emailService/newUser');
require('dotenv').config();


const app  = express()

app.use(express.json())
app.use('/project', projectrouter)
app.use('/employee', employeeRouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})

cron.schedule('*/5 * * * * *', async()=>{
    try{
        // console.log('Running a task every five seconds')
        // await welcomeAboard()

    }catch(error){

    }
    // console.log('Running a task every five seconds');
})
app.listen(4500, async()=>{
    
    try {
        await getPool()
        console.log('Server running on port 4500');
    } catch (error) {
        console.log(error);
        
    }

})