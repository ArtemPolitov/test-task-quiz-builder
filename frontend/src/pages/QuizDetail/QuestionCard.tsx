import type { Question } from '../../types/quizTypes';
import s from './QuizDetail.module.scss';

interface QuestionCardProps {
  question: Question;
  index: number;
}

export default function QuestionCard({ question, index }: QuestionCardProps) {

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'BOOLEAN': return 'True / False';
      case 'INPUT': return 'Text Input';
      case 'CHECKBOX': return 'Multiple Choice';
      default: return type;
    }
  };

  return (
    <div className={s.questionCard}>
      <div className={s.questionHeader}>
        <h3>{index + 1}. {question.text}</h3>
        <span className={s.badge}>
          {getQuestionTypeLabel(question.type)}
        </span>
      </div>

      <div className={s.questionBody}>
        {question.type === 'BOOLEAN' && (
          <div className={s.optionsWrapper}>
            <label className={s.optionItem}>
              <input type="radio" name={`boolean-${question.id}`} disabled />
              <span>True</span>
            </label>
            <label className={s.optionItem}>
              <input type="radio" name={`boolean-${question.id}`} disabled />
              <span>False</span>
            </label>
          </div>
        )}

        {question.type === 'INPUT' && (
          <input 
            type="text" 
            placeholder="User's text answer placeholder..." 
            className={s.textInputMock}
            disabled 
          />
        )}

        {question.type === 'CHECKBOX' && (
          <div className={s.optionsWrapper}>
            {question.options?.map((option, optIndex) => (
              <label key={optIndex} className={s.optionItem}>
                <input type="checkbox" disabled />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}