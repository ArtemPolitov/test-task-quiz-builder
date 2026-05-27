export interface Question {
  id: number;
  text: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  options: string[] | null;
  quizId: number;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions?: Question[];
}