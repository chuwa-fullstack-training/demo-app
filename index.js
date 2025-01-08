import cors from 'cors';
import express from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import profileRouter from './routes/profile.js';
import userRouter from './routes/users.js';
// import errorHandler from './middlewares/error.js';

const PORT = process.env.PORT || 3000;

connectDB();
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
// app.use(
//   express.static(path.resolve(import.meta.dirname, 'client', 'dist'), {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.css')) {
//         res.setHeader('Content-Type', 'text/css');
//       }
//     },
//   }),
// );

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Training Demo API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    host: `localhost:${PORT}`,
    basePath: '/',
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['routes/*.js'],
};
const specs = swaggerJSDoc(options);

app.use(
  '/swagger',
  swaggerUI.serve,
  // swaggerUI.setup(swaggerJsonFilePath)
  swaggerUI.setup(specs, {
    explorer: true,
  }),
);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postRouter);

// app.use(errorHandler);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(import.meta.dirname, 'client', 'dist', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
