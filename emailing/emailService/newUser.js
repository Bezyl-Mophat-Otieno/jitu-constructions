const DB = require('../../dBHelpers');
const ejs = require ('ejs');
const { sendMail } = require('../email');
const { getPool } = require('../../config/config');


const welcomeAboard = async (req,res) => {

    try{

        const users = await (await DB.exec('mailingList')).recordset
        for(let user of users){
            ejs.renderFile('../../Templates/welcomeUser.ejs', {email: user.email}, async(err, html) => {

               try {

                const message = {
                    from : process.env.EMAIL,
                    to: user.email,
                    subject: 'Welcome Aboard',
                    html
                }

                await sendMail(message)

                const pool = await getPool()

                await pool.request().query(`UPDATE employeesTable SET isSent = 1 WHERE email = '${user.email}'`)
               } catch (error) {

                console.log(error)
                
               }
        
        })

       }


    }catch(error){

    }
}

module.exports = {
    welcomeAboard
}