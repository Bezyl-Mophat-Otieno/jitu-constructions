const jwt = require('jsonwebtoken');
require('dotenv').config();


const tokenValidator = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }else{
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.info = decodedData;
        
        res.status(200).json({message:"Authorized"})
        // calling the next middleware function
        next()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error"})
        
    }

    


}

module.exports = {
    tokenValidator
}