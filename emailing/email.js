const nodemailer = require('nodemailer');
require('dotenv').config();
 

const createTransporter = (config)=>{

    return nodemailer.createTransport(config)
}

const config = {
    host : 'smtp.gmail.com',
    server:'gmail',
    port: 587,
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PWD
    }

}

const sendMail = async (messageOptions)=>{
    const transporter = createTransporter(config)
    await transporter.verify()
    await transporter.sendMail(messageOptions,(err, info)=>{
        console.log(info);
    })

}

module.exports = {
    sendMail
}