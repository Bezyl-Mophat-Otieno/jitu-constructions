// require , jwt , bcrypt , mssql , uuid
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {v4} = require('uuid')
const {createEmployeeTable} = require('../database/tables/createTables')
const {loginSchema, registerSchema} = require('../validators/employeeValidators')
const DB = require('../dBHelpers')
const crypto = require('crypto')


const  createEmployee = async(req, res)=>{
    // create a table first before creating an employee
    // await createEmployeeTable()

    try {
        const id = v4()
        const {e_name, email, password, } = req.body

        if(!e_name || !email || !password){
           
            return res.status(422).json({message:'All fields are required'})
        }

        // const {error} = registerSchema.validate(req.body)

        // if(error){
        //     return res.status(422).json({message:error.details[0].message})
        // }
        
        const hashedPassword = await bcrypt.hash(password, 5)
        await DB.exec('createEmployee', {id, e_name, email, password:hashedPassword})

        res.status(200).json({message:'Employee Created Successfully'})    
    } catch (error) {

        res.status(500).json({message:error.message || "Internal Server"})
        console.log(error)
        
    }

}

const loginEmployee = async(req, res)=>{

try {

    const {email, password} = req.body
    // validate the inputs using Joi
    const {error} = loginSchema.validate(req.body)

    if(error){
        return res.status(422).json({message:error.details[0].message})
    }

    const user = await (await DB.exec('loginEmployee',{email})).recordset[0]
    console.log(user)



    if(user){
        const hashedPassword = await user.password

        const isMatch = await bcrypt.compare(password, hashedPassword)

        if (isMatch){

            const {password, ...payload} = user

            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})

            res.json({message:"login successful",token})

        }else{

            res.json({message:"login failed , invalid credentials"})

        }

    }


    
} catch (error) {
    console.log(error)
}


}


//TESTING OUT MOCKING IN JEST
const generateBytes = async () => {
    const bytes = await crypto.randomBytes(16);
    return bytes;

}

const generateUUid = async () => {

    const id = await v4()
    return id
}



module.exports = {createEmployee, loginEmployee , generateBytes ,generateUUid }

