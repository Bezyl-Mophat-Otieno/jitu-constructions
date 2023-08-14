const DB = require ('../../dBHelpers')
const {welcomeAboard} = require('./newUser')
const ejs = require('ejs')
const {sendMail} = require('../email')

jest.mock('../../dBHelpers')
jest.mock('ejs',()=>{
    return{
        renderFile: jest.fn( (path, data, callback) => {
           return callback(null, 'html')
        })
    }
})


describe('Tesing the Email service ', () => {
    const mockedUsers = [
        {
            id: 1,
            email: 'johndoe@gmail.com'
        },
        {
            id: 2,
            email: 'ledama@gmail.com'
        },
    ]
    const mockedReq={}

    const mockedRes= {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }



    it('it should return a 404 when no users in the mailing lists are   found',async()=>{

        await DB.exec.mockResolvedValue({
            recordset:[]            
        })
        const mockedUsers = await  DB.exec()

          await welcomeAboard(mockedReq, mockedRes)
            expect(mockedRes.status).toHaveBeenCalledWith(404)
            expect(mockedRes.json).toHaveBeenCalledWith({
                message:'No users in the mailing list'
            })
        })

    it('should return an error when either the path or data is not provided to the ejs.renderFile method', async()=>{

       const mockedUsers = [
        {
            id: 1,
            email:'johndoe@gmail.com'
        },
        {
            id: 2,
            email:'ledama@gmail.com'
        },
    ]
        
        const mockedReq={}
    
        const mockedRes= {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await DB.exec.mockResolvedValue({
            recordset:mockedUsers
        })

        const users = await DB.exec()
        const mockedPath = 'huhjb'
        const mockedData = {user:mockedUsers[0].email}
        const callback = jest.fn(()=>('html'))
        ejs.renderFile.mockResolvedValueOnce(callback).mockResolvedValueOnce(callback)
       const value =await ejs.renderFile(mockedPath, mockedData, callback)

        console.log(value)
        await welcomeAboard(mockedReq, mockedRes)
         expect(mockedRes.json).toHaveBeenCalledWith({
            message:'Path or data not provided' 
        })
  
})
         
});
