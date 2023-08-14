const DB = require('../../dBHelpers');
const ejs = require ('ejs');
const { sendMail } = require('../email');
const { getPool } = require('../../config/config');
const {StatusCodes} = require('http-status-codes')


const welcomeAboard = async (req , res) => {


    try{

        const data = await (await DB.exec('mailingList'))
        const users = data.recordset
        if(users?.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({message:'No users in the mailing list'})

        }else{
        for(let user of users){


            const path = ''
            const data = {}

            ejs.renderFile(path, data,async(error, html) => {
                if(path === '' || data === {}){
                    console.log('Path or data not provided')
                    return res.status(StatusCodes.BAD_REQUEST).json({message:'Path or data not provided'})
                    
                }
                
                if(error){
                    throw new Error({message:'File not found'})
                //    return  res.status(StatusCodes.NOT_FOUND).json({message:'File not found'})
                }else{
                const message = {
                    from : process.env.EMAIL,
                    to: user.email,
                    subject: 'Welcome Aboard',
                    html
                }

                await sendMail(message)
              const result = (await DB.exec('sendMail', {email:user.email}))

              if(result.rowsAffected == [1]){
                console.log('Data fields updated successfully')
                // return res.status(StatusCodes.CREATED).json({message:'Email sent successfully'})
              }else{   
                  throw new Error({message:'Data Fields not updated'})
                // return res.status(StatusCodes.BAD_REQUEST).json({message:'Procedure does not exist'})

              }   
            }
        
        })

       }
    }
    }catch(error){
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Internal Server Error'})
    
    }
}



module.exports = {
    welcomeAboard
}