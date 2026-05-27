import { Router } from 'express';
import { createQuiz, getAllQuizzes, getQuizById, deleteQuiz } from '../controllers/quizController';
import { validate } from '../middleware/validateMiddleware';
import { 
  createQuizSchema, 
  getQuizByIdSchema, 
  deleteQuizSchema 
} from '../validation/quizValidation';

const router = Router();
router.post('/', validate(createQuizSchema), createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', validate(getQuizByIdSchema), getQuizById);
router.delete('/:id', validate(deleteQuizSchema), deleteQuiz);

export default router;