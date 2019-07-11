import { Router } from 'express';
import PropertyRoutes from './PropertyRoutes';
import Respond from '../helpers/ResponseHandler';

const router = new Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite API!' });
});

// properties route
router.use(PropertyRoutes);

// catch 404 routes
router.use('*', (req, res) => {
  Respond.response(res, 404, 'Route Not Found!', true);
});

export default router;
