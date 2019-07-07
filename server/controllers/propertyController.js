import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import properties from '../model/properties';

dotenv.config();

const { CLOUDNARY_NAME, CLOUDNARY_API_KEY, CLOUDNARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDNARY_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECRET
});

class PropertyController {
  // view all properties
  static viewAllProperties(req, res) {
    return res.status(200).json({
      status: res.statusCode,
      data: properties
    });
  }
}

export default PropertyController;
