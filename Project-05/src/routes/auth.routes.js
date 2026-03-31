const {Router} = require('express');
const { handleUserRegister, handleGetUser } = require('../controllers/auth.controller');
const authRouter = Router();




/**
 POST request (/api/auth/register)
**/
authRouter.post('/register', handleUserRegister)

/** 
GET request (/api/auth/get-user)
**/
authRouter.get('/get-user', handleGetUser)

module.exports = authRouter;