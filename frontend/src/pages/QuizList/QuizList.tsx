import { Link } from 'react-router-dom';
import { useQuizzes, useDeleteQuiz } from '../../hooks/useQuizzes';
import QuizCard from './QuizCard'; 
import s from './QuizList.module.scss';

export default function QuizList() {
  const { data: quizzes, isLoading, isError } = useQuizzes();
  
  const { mutate: deleteQuiz } = useDeleteQuiz();

  if (isLoading) {
    return (
      <div className={`container ${s.centerState}`}>
        <h2>Quizzes are loading. Please wait...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`container ${s.centerState}`}>
        <h2 style={{ color: 'var(--color-danger)' }}>Fetching data error</h2>
        <p>Please make sure the backend server is running.</p>
      </div>
    );
  }

  return (
    <div className={`container ${s.dashboard}`}>
      <div className={s.topBar}>
        <h1 className={s.title}>Quizzes</h1>
        <Link to="/create" className="btn btnPrimary">
          + Add quiz
        </Link>
      </div>

      {quizzes && quizzes.length === 0 ? (
        <div className={s.centerState}>
          <p>You don't have any quizzes created yet.</p>
          <Link to="/create" className="btn btnPrimary">
            Create the first quiz
          </Link>
        </div>
      ) : (

        <div className={s.flexList}>
          {quizzes?.map((quiz) => (
            <QuizCard 
              key={quiz.id} 
              quiz={quiz} 
              onDelete={deleteQuiz} 
            />
          ))}
        </div>
      )}
    </div>
  );
}