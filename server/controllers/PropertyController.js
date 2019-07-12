import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import moment from 'moment';
import properties from '../model/properties';
import Respond from '../helpers/ResponseHandler';

dotenv.config();

const { CLOUDNARY_NAME, CLOUDNARY_API_KEY, CLOUDNARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDNARY_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECRET
});

const { response } = Respond;
class PropertyController {
  // view all properties
  static viewAllProperties(req, res) {
    return response(res, 200, properties);
  }

  // view specific property
  static viewPropertyById(req, res) {
    const { id } = req.params;
    const property = properties.find(item => item.id === parseInt(id, 10));
    if (property) {
      return response(res, 200, property);
    }
    return response(res, 404, 'No property found', true);
  }

  // create a new property adverts
  // eslint-disable-next-line consistent-return
  static addNewProperty(req, res) {
    const { owner, price, state, city, address, type } = req.body;
    const propertyImage = req.files.image.path;
    cloudinary.uploader.upload(propertyImage, (result, error) => {
      if (error) {
        // return to stop further execution in this callback
        return response(res, 400, error, true);
      }
      const newProperty = {
        price,
        state,
        city,
        address,
        type,
        owner,
        id: properties.length + 1,
        status: 'available',
        created_on: moment().format(),
        image_url: result.url
      };
      properties.push(newProperty);
      return response(res, 201, newProperty);
    });
  }

  static deleteProperty(req, res) {
    const { id } = req.params;
    const propertyIndex = properties.findIndex(item => item.id === parseInt(id, 10));
    if (propertyIndex !== -1) {
      if (req.user.id === parseInt(id, 10) || req.user.is_admin === true) {
        properties.splice(propertyIndex, 1);
        return response(res, 200, {
          message: 'Property deleted successfully'
        });
      }
      return response(res, 403, { message: 'You are allowed to delete your property only!' }, true);
    }
    return response(res, 404, 'no property found!', true);
  }

  // eslint-disable-next-line consistent-return
  static updateProperty(req, res) {
    const { id } = req.params;
    const property = properties.find(item => item.id === parseInt(id, 10));
    if (property) {
      if (req.user.id === parseInt(id, 10) || req.user.is_admin === true) {
        const datas = Object.keys(req.body);
        datas.forEach(data => {
          property[data] = req.body[data];
        });
        return response(res, 200, property);
      }
      return response(res, 403, { message: 'You are allowed to update your property only!' }, true);
    }
    return response(res, 404, 'property your are trying to update is not available!', true);
  }

  // mark property as sold
  static markPropertyAsSold(req, res) {
    const { id } = req.params;
    const property = properties.find(item => item.id === parseInt(id, 10));
    if (property) {
      if (req.user.id === parseInt(id, 10) || req.user.is_admin === true) {
        property.status = 'sold';
        return response(res, 200, property);
      }
      return response(
        res,
        403,
        { message: 'You are allowed to mark as sold your property only!' },
        true
      );
    }
    return response(res, 404, 'No property found', true);
  }

  // view properties by type
  static viewPropertiesByType(req, res) {
    const propertiesResult = properties.filter(item => item.type === req.query.type);
    if (propertiesResult.length > 0) {
      return response(res, 200, propertiesResult);
    }
    return response(res, 404, 'No available properties of such a type', true);
  }
}

export default PropertyController;
