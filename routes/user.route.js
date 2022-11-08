const express = require('express');
const verifyEmployeeJWT = require('../controllers/emrJwtController');
const verifyEmployerJWT = require('../controllers/emeJwtController');
const { postUser, getUser, getAllUsers, getSecretData } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/register', postUser);
userRouter.post('/login', getUser);
userRouter.get('/getallusers', getAllUsers);
userRouter.post('/secreteme', verifyEmployeeJWT , getSecretData);
userRouter.post('/secretemr', verifyEmployerJWT , getSecretData);


module.exports = userRouter;