import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllQuizzes, getQuizById, createQuiz, deleteQuiz } from '../services/api';

export function useQuizzes() {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: getAllQuizzes,
  });
}

export function useQuizDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuizById(id || ''),
    enabled: !!id, 
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}