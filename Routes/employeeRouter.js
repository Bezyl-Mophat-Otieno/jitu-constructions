const {Router} = require('express');
const { createEmployee ,loginEmployee } = require('../Controllers/authController');


const employeeRouter = Router();

employeeRouter.post('/', createEmployee);
employeeRouter.post('/login', loginEmployee);


module.exports = {
    employeeRouter
}