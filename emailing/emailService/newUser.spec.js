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

        await DB.exec.mockResolvedValue({
            recordset:[mockedUsers]
        })

        const users = await DB.exec()
        const mockedPath = ''
        const mockedData = {}
        const callback = jest.fn(()=>('html'))
        const mockedRenderFile = ejs.renderFile(mockedPath , mockedData, callback)
        console.log(mockedRenderFile)
        console.log(mockedPath)
        console.log(mockedData)
        await welcomeAboard(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(400)
        expect(mockedRes.json).toHaveBeenCalledWith({
            message:'Path or data not provided' 
        })
  
})
         
});
