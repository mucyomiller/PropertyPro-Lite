import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import moment from 'moment';
import properties from '../model/properties';
import Respond from '../helpers/responseHandler';

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
    Respond.response(res, 200, properties);
  }

  // view specific property
  static viewPropertyById(req, res) {
    const { id } = req.params;
    const property = properties.find(item => item.id === parseInt(id, 10));
    if (property) {
      Respond.response(res, 200, property);
      return;
    }
    Respond.response(res, 404, 'No property found', true);
  }

  // create a new property adverts
  // eslint-disable-next-line consistent-return
  static addNewProperty(req, res) {
    const { owner, price, state, city, address, type } = req.body;
    const propertyImage = req.files.image.path;
    cloudinary.uploader.upload(propertyImage, (result, error) => {
      if (error) {
        Respond.response(res, 400, error, true);
        // stop further execution in this callback
        return;
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
      Respond.response(res, 201, newProperty);
    });
  }

  static deleteProperty(req, res) {
    const { id } = req.params;
    const propertyIndex = properties.findIndex(item => item.id === parseInt(id, 10));
    if (propertyIndex !== -1) {
      properties.splice(propertyIndex, 1);
      Respond.response(res, 200, { message: 'Property deleted successfully' });
      return;
    }
    Respond.response(res, 404, 'no property found!', true);
  }

  // eslint-disable-next-line consistent-return
  static updateProperty(req, res) {
    const { id } = req.params;
    const property = properties.find(item => item.id === parseInt(id, 10));
    if (property) {
      const datas = Object.keys(req.body);
      datas.forEach(data => {
        property[data] = req.body[data];
      });
      Respond.response(res, 201, property);
    }
  }

  // mark property as sold
  static markPropertyAsSold(req, res) {
    const { id } = req.params;
    const property = properties.find(item => item.id === parseInt(id, 10));
    if (property) {
      property.status = 'sold';
      Respond.response(res, 200, property);
      return;
    }
    Respond.response(res, 404, 'No property found', true);
  }

  // view properties by type
  static viewPropertiesByType(req, res) {
    const propertiesResult = properties.filter(item => item.type === req.query.type);
    if (propertiesResult.length > 0) {
      Respond.response(res, 200, propertiesResult);
      return;
    }
    Respond.response(res, 404, 'No properties of such a type', true);
  }
}

export default PropertyController;
