import { useNavigate } from 'react-router-dom';
import type { Quiz } from '../../types/quizTypes';
import s from './QuizList.module.scss';

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: number) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const navigate = useNavigate();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 

    if (window.confirm('Are you sure you want to delete this quiz?')) {
      onDelete(quiz.id);
    }
  };

  return (
    <div
      className={s.card}
      onClick={() => navigate(`/quizzes/${quiz.id}`)}
    >
      <div className={s.cardContent}>
        <h3>{quiz.title}</h3>
        <span className={s.date}>
          Created: {new Date(quiz.createdAt).toLocaleDateString('en-US')}
        </span>
      </div>

      <div className={s.cardFooter}>
        <span className={s.viewLink}>View structure →</span>
        <button
          className="btn btnDanger"
          style={{ padding: '6px 12px', fontSize: '13px' }}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}