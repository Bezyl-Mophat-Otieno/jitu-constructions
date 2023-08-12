const jwt = require('jsonwebtoken');
const {tokenValidator} = require('./tokenValidator')
jest.mock('jsonwebtoken')
describe('Checking Validity of tokens', () => {

    it('should return an error if no token is provided', async () => {

        const mockedReq = {
            headers:{}
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }
        const mockedNext = jest.fn()
        await tokenValidator(mockedReq, mockedRes, mockedNext)
        expect(mockedRes.status).toBeCalledWith(401)
        expect(mockedRes.json).toBeCalledWith({message:'Unauthorized'})
    })

    it('should return success if the token is valid', async () => {


        const mockedReq = {
            headers:{
                token:'test token'
            }
        }
    
        const mockedData = jwt.verify.mockReturnValueOnce({
            id:'test id',
            e_name:'test name',
        })
        mockedReq.info = mockedData
        const mockedRes={
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }
        
        const mockedNext = jest.fn()
        await tokenValidator(mockedReq, mockedRes, mockedNext)
        expect(mockedRes.status).toBeCalledWith(200)
        expect(mockedRes.json).toBeCalledWith({message:'Authorized'})
    })


    
    
});

