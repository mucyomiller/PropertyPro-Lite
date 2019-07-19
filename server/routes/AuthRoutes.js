import express from 'express';
import AuthController from '../controllers/AuthController';
import { Validation } from '../middleware/validation';

const router = express.Router();
// get validation
const { userValidator, passwordResetValidator } = Validation;
// get all routes
const { signIn, signUp, resetPassword } = AuthController;

router.post('/signup', userValidator, signUp);
router.post('/signin', signIn);
router.post('/:email/reset_password', passwordResetValidator, resetPassword);

export default router;
