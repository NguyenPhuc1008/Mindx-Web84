import express from 'express'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';

const app = express()
const port = 4000
connectDB();

app.use(express.json())

app.use('/users', userRouter)
app.use('/posts', postRouter)



app.listen(port, () => {
    console.log('Server started on PORT:' + port)
})