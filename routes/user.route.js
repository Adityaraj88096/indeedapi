const express = require('express');
const { postUser, getUser, getAllUsers } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/register', postUser);
userRouter.post('/login', getUser);
userRouter.get('/getallusers', getAllUsers);

module.exports = userRouter;