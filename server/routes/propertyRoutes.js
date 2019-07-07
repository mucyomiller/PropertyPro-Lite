import express from 'express';
import PropertyController from '../controllers/propertyController';

const router = express.Router();

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById);

export default router;
