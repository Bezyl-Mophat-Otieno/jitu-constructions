const DB = require ('../../dBHelpers')
const {welcomeAboard} = require('./newUser')
const ejs = require('ejs')
const {sendMail} = require('../email')

jest.mock('../../dBHelpers')
jest.mock('ejs')

describe('Tesing the Email service ', () => {
    const mockedUsers = [
        {
            id: 1,
            email: ''
        },
        {
            id: 2,
            email: ''
        },
    ]
    const mockedReq={}

    const mockedRes= {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }



    it('it should return a 404 when no users in the mailing lists are   found',async()=>{

        const  mockedUsers = await DB.exec.mockResolvedValueOnce({
            recordset:[]            
        })
          await welcomeAboard(mockedReq, mockedRes)
            expect(mockedRes.status).toHaveBeenCalledWith(404)
            expect(mockedRes.json).toHaveBeenCalledWith({
                message:'No users in the mailing list'
            })
        })
        
        
        it('should return an error if the file is not found', async()=>{
            const users = await DB.exec.mockResolvedValue({
                recordset:mockedUsers           
            })
            const users1 = await DB.exec()
            // console.log(users1)
            
            ejs.renderFile.mockImplementation((path, data, callback)=>{
               return   callback('error', null)
            })

            ejs.renderFile.mockResolvedValueOnce('error', null)

           const err = await ejs.renderFile()

        //    console.log(err)

            await welcomeAboard(mockedReq, mockedRes)
            expect(mockedRes.status).toHaveBeenCalledWith(404)
            expect(mockedRes.json).toHaveBeenCalledWith({
                message:'File not found'
            })
        })

        it('should send emails', async()=>{

            const users = await DB.exec.mockResolvedValue({
                recordset:mockedUsers           
            })
            const users1 = await DB.exec()
            // console.log(users1)
            

            ejs.renderFile.mockImplementation((path, data, callback)=>{
                return   callback(null,'html')
            })


        })
        
});
