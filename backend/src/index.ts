import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './db';
import quizRoutes from './routes/quizRoutes';
import errorHandler from './middleware/errorMiddleware'; 

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
// Middlewares
app.use(cors());
app.use(express.json()); 
app.use('/api/quizzes', quizRoutes);

// app.use('/api/quizzes', quizRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('✅ SQLite Database connection initialized via Prisma');

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server launch error:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();