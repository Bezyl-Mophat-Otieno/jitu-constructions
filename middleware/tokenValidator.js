const jwt = require('jsonwebtoken');
require('dotenv').config();


const tokenValidator = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.info = decodedData;
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Unauthorized"})
        
    }

    // calling the next middleware function
    
    next()


}

module.exports = {
    tokenValidator
}