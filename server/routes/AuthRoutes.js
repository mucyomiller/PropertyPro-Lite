import express from 'express';
import AuthController from '../controllers/AuthController';
import { Validation } from '../middleware/validation';

const router = express.Router();
// get validation
const { userValidator } = Validation;
// get all routes
const { signIn, signUp } = AuthController;

router.post('/signup', userValidator, signUp);
router.post('/signin', signIn);

export default router;
