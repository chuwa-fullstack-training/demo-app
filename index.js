import cors from 'cors';
import express from 'express';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import profileRouter from './routes/profile.js';
import userRouter from './routes/users.js';
import typeDefs from './schema/schema.js';
import resolvers from './resolvers/resolvers.js';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 3000;

connectDB();
const app = express();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server
await server.start();

app.use(express.json());

// Apply Apollo Server middleware with context
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          return { user: decoded.user };
        } catch (err) {
          console.error('Error verifying token:', err);
        }
      }
      return { user: null };
    },
  }),
);

// ... rest of your routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postRouter);

app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
});
