export interface QuestionFormItem {
  text: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  optionsString?: string;
}

export interface QuizFormInputs {
  title: string;
  questions: QuestionFormItem[];
}