import axios from 'axios';
import type { Quiz } from '../types/quizTypes';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllQuizzes = async () => {
  const response = await api.get<Quiz[]>('/quizzes');
  return response.data;
};

export const getQuizById = async (id: string | number) => {
  const response = await api.get<Quiz>(`/quizzes/${id}`);
  return response.data;
};

export const createQuiz = async (quizData: any) => {
  const response = await api.post<Quiz>('/quizzes', quizData);
  return response.data;
};

export const deleteQuiz = async (id: number) => {
  const response = await api.delete<{ success: boolean; message: string }>(`/quizzes/${id}`);
  return response.data;
};