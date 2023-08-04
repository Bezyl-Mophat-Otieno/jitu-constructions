const DB = require('../dBHelpers');
const {createEmployee} = require ('./authController')
const {v4} = require('uuid')
const mssql = require('mssql')


describe('createEmployee', ()=>{
    describe('Testing the request Body for creating an employee', ()=>{
        it('should return an error if any of the fields is not provided',async() => {
            const req = {
                body :{
            
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await createEmployee(req, res)
            expect(res.json).toHaveBeenCalledWith(
                {
                    message:'All fields are required'
                }
            ) 
        });
        it('it should return a success if all the fields are provided including data and procedure name',async()=>{
        
            const req ={
                body:{
                    id:'test id',
                    e_name:'test name',
                    email:v4(),
                    password:'test password'
                }
            }

            res = {
                status: jest.fn().mockReturnThis(), 
                json: jest.fn()
            }

            const data = req.body
            const procedureName = 'createEmployee'


            jest.spyOn(mssql , 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce(
                {
                  message:'Employee Created Successfully'
                }
                )
            })


            await DB.exec(procedureName, data)

            await createEmployee(req, res)
            expect(res.json).toHaveBeenCalledWith({
                message:'Employee Created Successfully'
            })

        })



        
    })
})