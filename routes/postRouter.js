import express from 'express';
import posts from '../controller/postController.js';
import authUser from '../middleware/auth.js';

const postRouter = express.Router();

postRouter.post('/add-post', authUser, posts.add)
postRouter.post('/update-post/:postId', authUser, posts.update)

export default postRouter;