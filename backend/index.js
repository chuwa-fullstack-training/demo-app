import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import profileRouter from './routes/profile.js';
import userRouter from './routes/users.js';

connectDB();
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
