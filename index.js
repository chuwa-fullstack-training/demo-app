import cors from 'cors';
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import profileRouter from './routes/profile.js';
import userRouter from './routes/users.js';

const PORT = process.env.PORT || 3000;

connectDB();
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
app.use(express.static(path.resolve(import.meta.dirname, 'client', 'dist')));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postRouter);

app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
