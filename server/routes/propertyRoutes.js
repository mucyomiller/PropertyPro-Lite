import express from 'express';
import multiparty from 'connect-multiparty';
import PropertyController from '../controllers/PropertyController';
import { Validation } from '../middleware/validation';
import Authorization from '../middleware/authorization';

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
// get authorization middleware
const { checkToken } = Authorization;

// define all need routes
router.get('/properties', viewAllProperties);
router.get('/property/:id', viewPropertyById);
router.post('/property', checkToken, multipartyMiddle, addProperyValidator, addNewProperty);
router.delete('/property/:id', deleteProperty);
router.patch('/property/:id', multipartyMiddle, updatePropertyValidator, updateProperty);
router.patch('/property/:id/sold', markPropertyAsSold);
router.get('/property', viewPropertiesByType);

export default router;
