import { useParams, Link } from 'react-router-dom';
import { useQuizDetail } from '../../hooks/useQuizzes';
import QuestionCard from './QuestionCard';
import s from './QuizDetail.module.scss';

export default function QuizDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: quiz, isLoading, isError } = useQuizDetail(id);

  if (isLoading) {
    return (
      <div className={`container ${s.centerState}`}>
        <h2>Loading quiz structure. Please wait...</h2>
      </div>
    );
  }

  if (isError || !quiz) {
    return (
      <div className={`container ${s.centerState}`}>
        <h2 style={{ color: 'var(--color-danger)' }}>Quiz not found</h2>
        <p>Failed to load data. This quiz may have been deleted.</p>
        <Link to="/" className="btn btnPrimary" style={{ marginTop: '15px' }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${s.detailPage}`}>
      <Link to="/" className={s.backLink}>
        ← Back to Quizzes
      </Link>

      <header className={s.header}>
        <h1>{quiz.title}</h1>
        <div className={s.meta}>
          <span>Total Questions: {quiz.questions?.length || 0}</span>
          <span style={{ margin: '0 10px' }}>•</span>
          <span>Created: {new Date(quiz.createdAt).toLocaleDateString('en-US')}</span>
        </div>
      </header>

      <div className={s.questionsList}>
        {quiz.questions && quiz.questions.length === 0 ? (
          <div className={s.centerState} style={{ minHeight: '150px' }}>
            <p>There are no questions in this quiz yet.</p>
          </div>
        ) : (
          quiz.questions?.map((question, index) => (
            <QuestionCard 
              key={question.id} 
              question={question} 
              index={index} 
            />
          ))
        )}
      </div>
    </div>
  );
}