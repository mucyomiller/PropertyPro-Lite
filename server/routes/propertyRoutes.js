import express from 'express';
import multiparty from 'connect-multiparty';
import PropertyController from '../controllers/propertyController';

const multipartyMiddle = multiparty();

const router = express.Router();

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById);
router.post('/property', multipartyMiddle, PropertyController.addNewProperty);

export default router;
