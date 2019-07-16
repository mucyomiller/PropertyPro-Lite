import express from 'express';
import PropertyController from '../../controllers/v2/PropertyController';

const router = express.Router();

// get all routes
const { viewAllProperties } = PropertyController;

// define all need routes
router.get('/properties', viewAllProperties);

export default router;
