import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateQuiz } from '../../hooks/useQuizzes';
import QuestionFormCard from './QuestionFormCard';
import s from './QuizCreate.module.scss';
import type { QuizFormInputs } from './types';

export default function QuizCreate() {
  const navigate = useNavigate();
  const { mutateAsync: createQuiz, isPending } = useCreateQuiz();

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<QuizFormInputs>({
    defaultValues: {
      title: '',
      questions: [{ text: '', type: 'BOOLEAN', optionsString: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const watchQuestions = watch('questions');

  const onSubmit = async (data: QuizFormInputs) => {
    const formattedQuestions = data.questions.map((q) => {
      let options: string[] = [];
      
      if (q.type === 'CHECKBOX' && q.optionsString) {
        options = q.optionsString
          .split(',')
          .map((opt) => opt.trim())
          .filter((opt) => opt.length > 0);
      }

      return {
        text: q.text,
        type: q.type,
        options: options
      };
    });

    const payload = {
      title: data.title,
      questions: formattedQuestions
    };

    try {
      await createQuiz(payload);
      navigate('/');
    } catch (error) {
      console.error('Failed to create quiz:', error);
    }
  };

  return (
    <div className={`container ${s.createPage}`}>
      <Link to="/" className={s.backLink}>
        ← Back to Dashboard
      </Link>

      <h1 className={s.title}>Create New Quiz</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formGroup}>
          <label htmlFor="title">Quiz Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter quiz title (e.g., JavaScript Advanced)"
            {...register('title', { required: 'Quiz title is required' })}
          />
          {errors.title && <span className={s.errorText}>{errors.title.message}</span>}
        </div>

        <div className={s.sectionTitle}>
          <h2>Questions</h2>
          <button
            type="button"
            className="btn btnSecondary"
            style={{ padding: '8px 16px', fontSize: '14px' }}
            onClick={() => append({ text: '', type: 'BOOLEAN', optionsString: '' })}
          >
            + Add Question
          </button>
        </div>

        <div className={s.questionsContainer}>
          {fields.map((field, index) => (
            <QuestionFormCard
              key={field.id}
              fieldId={field.id}
              index={index}
              register={register}
              errors={errors}
              currentType={watchQuestions?.[index]?.type}
              showRemoveButton={fields.length > 1}
              onRemove={remove}
            />
          ))}
        </div>

        <div className={s.actions}>
          <button type="submit" className="btn btnPrimary" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Quiz'}
          </button>
          <Link to="/" className="btn btnSecondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}