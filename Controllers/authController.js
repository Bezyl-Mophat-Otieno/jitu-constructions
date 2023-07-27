// require , jwt , bcrypt , mssql , uuid
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mssql = require('mssql')
const {v4} = require('uuid')
const {pool, getPool} = require('../config/config')
const {createEmployeeTable} = require('../database/tables/createTables')
const {loginSchema, registerSchema} = require('../validators/employeeValidators')


const  createEmployee = async(req, res)=>{
    // create a table first before creating an employee
    // await createEmployeeTable()

    try {
        const id = v4()
        const {e_name, email, password, } = req.body

        const {error} = registerSchema.validate(req.body)

        if(error){
            return res.status(422).json({message:error.details[0].message})
        }
        

        

        const pool = await getPool();

        const hashedPassword = await bcrypt.hash(password, 5)


           const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('e_name', mssql.VarChar, e_name)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, hashedPassword)
            .execute('createEmployee')


            if(result.rowsAffected==1){

                res.json('Employee created successfully');

            }else{

                res.json('Employee creation failed');

            }

    
    

        
    } catch (error) {
        console.log(error)
        
    }



}

const loginEmployee = async(req, res)=>{

try {

    const {email, password} = req.body
    // validate the inputs using roi
    const {error} = loginSchema.validate(req.body)

    if(error){
        return res.status(422).json({message:error.details[0].message})
    }
    const pool = await getPool();


    const user = (await pool.request().input('email', email).execute('loginEmployee')).recordset[0]
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

module.exports = {createEmployee, loginEmployee}

