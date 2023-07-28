const DB = require('../../dBHelpers');


const welcomeAboard = async (req,res) => {

    try{
        const users = await DB.exec('mailingList').recordset
        console.log(users)


    }catch(error){

    }



}

module.exports = {
    welcomeAboard
}