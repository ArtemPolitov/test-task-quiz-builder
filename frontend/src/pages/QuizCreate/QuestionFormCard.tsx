import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import s from './QuizCreate.module.scss';
import type { QuizFormInputs } from './types';

interface QuestionFormCardProps {
  index: number;
  register: UseFormRegister<QuizFormInputs>;
  errors: FieldErrors<QuizFormInputs>;
  currentType: 'BOOLEAN' | 'INPUT' | 'CHECKBOX' | undefined;
  showRemoveButton: boolean;
  onRemove: (index: number) => void;
}

export default function QuestionFormCard({
  index,
  register,
  errors,
  currentType,
  showRemoveButton,
  onRemove,
}: QuestionFormCardProps) {
  return (
    <div className={s.questionBox}>
      <div className={s.questionTop}>
        <h4>Question #{index + 1}</h4>
        {showRemoveButton && (
          <button
            type="button"
            className="btn btnDanger"
            style={{ padding: '4px 10px', fontSize: '12px' }}
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        )}
      </div>

      <div className={s.formGroup}>
        <input
          type="text"
          placeholder="Enter question text"
          {...register(`questions.${index}.text` as const, { required: 'Question text is required' })}
        />
        {errors.questions?.[index]?.text && (
          <span className={s.errorText}>{errors.questions[index]?.text?.message}</span>
        )}
      </div>

      <div className={s.formGroup}>
        <select {...register(`questions.${index}.type` as const)}>
          <option value="BOOLEAN">True / False</option>
          <option value="INPUT">Text Input</option>
          <option value="CHECKBOX">Multiple Choice (Checkbox)</option>
        </select>
      </div>

      {currentType === 'CHECKBOX' && (
        <div className={s.optionsBlock}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Options (Comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. Option 1, Option 2, Option 3"
            {...register(`questions.${index}.optionsString` as const, {
              required: 'Options are required for multiple choice questions'
            })}
          />
          {errors.questions?.[index]?.optionsString && (
            <span className={s.errorText}>{errors.questions[index]?.optionsString?.message}</span>
          )}
        </div>
      )}
    </div>
  );
}