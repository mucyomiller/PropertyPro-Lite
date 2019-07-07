import express from 'express';
import PropertyController from '../controllers/propertyController';

const router = express.Router();

router.get('/properties', PropertyController.viewAllProperties);

export default router;
