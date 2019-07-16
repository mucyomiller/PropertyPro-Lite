import { Router } from 'express';
import PropertyRoutes from './PropertyRoutes';
import AuthRoutes from './AuthRoutes';

const router = new Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite API V2.0!' });
});

// properties route
router.use(PropertyRoutes);
router.use('/auth', AuthRoutes);

export default router;
