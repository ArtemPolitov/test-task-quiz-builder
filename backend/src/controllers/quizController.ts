import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import prisma from '../db';
import { Question } from '@prisma/client';

// 1. POST /api/quizzes
export const createQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, questions } = req.body;

    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((question: { text: string; type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX'; options?: string[] }) => ({
            text: question.text,
            type: question.type,
            options: question.options ? JSON.stringify(question.options) : null,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    const formattedQuestions = newQuiz.questions.map((question: Question) => ({
      ...question,
      options: question.options ? JSON.parse(question.options) : null,
    }));

    res.status(201).json({
      ...newQuiz,
      questions: formattedQuestions,
    });
  } catch (error) {
    next(error);
  }
};

// 2. GET /api/quizzes
export const getAllQuizzes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};

// 3. GET /api/quizzes/:id
export const getQuizById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quizId = Number(req.params.id);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return next(createError(404, 'Quiz is not found'));
    }

    const formattedQuestions = quiz.questions.map((question: Question) => ({
      ...question,
      options: question.options ? JSON.parse(question.options) : null,
    }));

    res.status(200).json({
      ...quiz,
      questions: formattedQuestions,
    });
  } catch (error) {
    next(error);
  }
};

// 4. DELETE /api/quizzes/:id
export const deleteQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quizId = Number(req.params.id);

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully',
    });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return next(createError(404, 'Quiz is not found'));
    }
    next(error);
  }
};