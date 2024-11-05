import express from 'express';
import users from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', users.register)
userRouter.post('/login', users.login)

export default userRouter;
