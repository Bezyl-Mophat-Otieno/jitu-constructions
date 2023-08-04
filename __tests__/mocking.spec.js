const crypto = require('crypto');
const { v4 } = require('uuid');

const {generateBytes , generateUUid} = require('../Controllers/authController')


// creating my first test case by moking the generateRandom function
jest.mock('crypto')
test('generate random bytes', async()=>{
    crypto.randomBytes.mockReturnValueOnce('rdtfyuiofjdhgvchwegdf')

    const res =await  generateBytes()
    // console.log(res)
})



// creating my second test case by moking the generateUUid function
jest.mock('uuid')
test('generate random ids', async()=>{
    v4.mockReturnValueOnce('rdtfyuiofjdhgvchwegdf')
    const res =await  generateUUid()
    // console.log(res)
})


// creating my third test case by moking the mocking functions 


test('Testing out mocking implementation' , ()=>{
    const mockedFN = jest.fn(()=> 'hello world This is default implementation').mockImplementation(()=>{
        return 'hello world This is new implementation 1'
    }).mockImplementation(()=>{
        return 'hello world This is new implementation 2'
    })
    console.log(mockedFN())
    console.log(mockedFN())
    console.log(mockedFN())
})


// creating my fourth test case by moking the mocking functions

test('Testing out mocking implementation Once' , ()=>{
    const mockedFN = jest.fn(()=> 'hello world This is default implementation').mockImplementationOnce(()=>{
        return 'hello world This is new implementation 1'
    }).mockImplementationOnce(()=>{
        return 'hello world This is new implementation 2'
    })
    // console.log(mockedFN())
    // console.log(mockedFN())
    // console.log(mockedFN())
    // console.log(mockedFN())
})