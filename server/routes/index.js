import { Router } from 'express';
import propertyRoutes from './propertyRoutes';

const router = new Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite API!' });
});

// properties route
router.use(propertyRoutes);

export default router;
