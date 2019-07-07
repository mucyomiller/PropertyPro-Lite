import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Joi from '@hapi/joi';
import moment from 'moment';
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

  // view specific property
  static viewPropertyById(req, res) {
    const { id } = req.params;
    const property = properties.find(item => item.id === parseInt(id, 10));
    if (property) {
      return res.status(200).json({
        status: res.statusCode,
        data: property
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'No property found'
    });
  }

  // create a new property advert
  // eslint-disable-next-line consistent-return
  static addNewProperty(req, res) {
    const schema = Joi.object().keys({
      owner: Joi.number()
        .integer()
        .required(),
      price: Joi.number().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      type: Joi.string().required()
    });
    const { error: validationErrors } = Joi.validate(req.body, schema, { abortEarly: false });
    if (validationErrors || !req.files.image) {
      const error = [];
      const { details: errors = [] } = validationErrors || {};
      errors.forEach(element => {
        error.push(element.message.split('"').join(''));
      });
      if (!req.files.image) {
        error.push('No image file selected');
      }
      return res.status(400).json({
        status: res.statusCode,
        error
      });
    }
    const { owner, price, state, city, address, type } = req.body;
    const propertyImage = req.files.image.path;
    cloudinary.uploader.upload(propertyImage, (result, error) => {
      if (error) {
        return res.status(400).json({
          status: res.statusCode,
          error
        });
      }
      const newProperty = {
        id: properties.length + 1,
        owner,
        status: 'available',
        price,
        state,
        city,
        address,
        type,
        created_on: moment().format(),
        image_url: result.url
      };
      properties.push(newProperty);
      return res.status(201).json({
        status: res.statusCode,
        data: newProperty
      });
    });
  }

  static deleteProperty(req, res) {
    const { id } = req.params;
    const propertyIndex = properties.findIndex(item => item.id === parseInt(id, 10));
    if (propertyIndex !== -1) {
      properties.splice(propertyIndex, 1);
      return res.status(200).json({
        status: res.statusCode,
        message: 'Property deleted successfully'
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'No property found'
    });
  }
}

export default PropertyController;
