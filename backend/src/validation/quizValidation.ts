import { z } from 'zod';

const questionSchema = z.object({
  text: z
    .string()
    .min(1, 'Question text cannot be empty'),
  
  type: z
    .enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
  
  options: z
    .array(z.string())
    .optional(),
}).refine(
  (question) => {
    if (question.type === 'CHECKBOX') {
      return Array.isArray(question.options) && question.options.length >= 2;
    }
    return true;
  },
  {
    message: 'For CHECKBOX questions, at least 2 options are required',
    path: ['options'],
  }
);

// 1. POST /api/quizzes
export const createQuizSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, 'Quiz title must be at least 3 characters long'),
    
    questions: z
      .array(questionSchema)
      .min(1, 'Quiz must contain at least one question'),
  }),
});

// 2. GET /api/quizzes/:id
export const getQuizByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, 'Quiz ID must be a valid number'),
  }),
});

// 3. DELETE /api/quizzes/:id
export const deleteQuizSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, 'Quiz ID must be a valid number'),
  }),
});