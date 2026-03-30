const {Router} = require('express');
const { handleUserRegister } = require('../controllers/auth.controller');
const authRouter = Router();




/**
 POST request (/api/auth/register)
*/
authRouter.post('/register', handleUserRegister)

module.exports = authRouter;