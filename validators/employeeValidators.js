const Joi = require('joi');

const loginSchema =  Joi.object({
// pass in the fields that you are planning to validate
email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
password:Joi.string().required()

})

const registerSchema = Joi.object({
// pass in the fields that you are planning to validate
e_name: Joi.string().required(),
email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com','net'] } }).required(),
password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

})

module.exports = {
    loginSchema,
    registerSchema
}