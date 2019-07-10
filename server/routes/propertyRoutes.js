import express from 'express';
import multiparty from 'connect-multiparty';
import PropertyController from '../controllers/propertyController';
import Validation from '../middleware/validation';

const multipartyMiddle = multiparty();

const router = express.Router();

router.get('/properties', PropertyController.viewAllProperties);
router.get('/property/:id', PropertyController.viewPropertyById);
router.post(
  '/property',
  multipartyMiddle,
  Validation.addProperyValidator,
  PropertyController.addNewProperty
);
router.delete('/property/:id', PropertyController.deleteProperty);
router.patch(
  '/property/:id',
  multipartyMiddle,
  Validation.updatePropertyValidator,
  PropertyController.updateProperty
);
router.patch('/property/:id/sold', PropertyController.markPropertyAsSold);
router.get('/property', PropertyController.viewPropertiesByType);

export default router;
