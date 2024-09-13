import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import postRouter from './routes/posts.js';

connectDB();
const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postRouter);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
