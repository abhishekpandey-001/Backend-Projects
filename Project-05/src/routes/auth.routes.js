const {Router} = require('express');
const { handleUserRegister, handleGetUser, handleRefreshToken } = require('../controllers/auth.controller');
const authRouter = Router();




/**
 POST request (/api/auth/register)
**/
authRouter.post('/register', handleUserRegister)

/** 
GET request (/api/auth/get-user)
**/
authRouter.get('/get-user', handleGetUser)

/**
 * GET /api/auth/refresh-token
 */
authRouter.get('/refresh-token', handleRefreshToken)

module.exports = authRouter;