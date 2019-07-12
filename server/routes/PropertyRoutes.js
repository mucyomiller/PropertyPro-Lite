import express from 'express';
import multiparty from 'connect-multiparty';
import PropertyController from '../controllers/PropertyController';
import { Validation } from '../middleware/validation';
import Authentication from '../middleware/authentication';

const multipartyMiddle = multiparty();
const router = express.Router();

// get all routes
const {
  viewAllProperties,
  viewPropertyById,
  addNewProperty,
  deleteProperty,
  updateProperty,
  markPropertyAsSold,
  viewPropertiesByType
} = PropertyController;

// get needed validation
const { addProperyValidator, updatePropertyValidator } = Validation;
// get authentication middleware
const { checkToken } = Authentication;

// define all need routes
router.get('/properties', viewAllProperties);
router.get('/property/:id', viewPropertyById);
router.post('/property', checkToken, multipartyMiddle, addProperyValidator, addNewProperty);
router.delete('/property/:id', checkToken, deleteProperty);
router.patch(
  '/property/:id',
  checkToken,
  multipartyMiddle,
  updatePropertyValidator,
  updateProperty
);
router.patch('/property/:id/sold', checkToken, markPropertyAsSold);
router.get('/property', viewPropertiesByType);

export default router;
