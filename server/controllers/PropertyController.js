import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import moment from 'moment';
import Respond from '../helpers/ResponseHandler';
import DbHelper from '../helpers/DbHelper';

dotenv.config();

const { CLOUDNARY_NAME, CLOUDNARY_API_KEY, CLOUDNARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDNARY_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECRET
});

const { response } = Respond;

// db helpers  funcs
const { queryAll, findOne, findAll, insert, deleteItem, update } = DbHelper;

class PropertyController {
  // view all properties
  static async viewAllProperties(req, res) {
    const { error, response: result } = await queryAll('properties');
    if (error) {
      return response(res, 500, 'Oops! unexpected things happened into server', true);
    }
    const { rows, rowCount } = result;
    if (rowCount > 0) {
      if (rowCount === 1) {
        const [firstItem] = rows;
        return response(res, 200, firstItem);
      }
      return response(res, 200, rows);
    }
    return response(res, 404, 'no properties found!');
  }

  // view specific property
  static async viewPropertyById(req, res) {
    const { id } = req.params;
    const { error, response: result } = await findOne('properties', 'id', parseInt(id, 10));
    if (error) {
      return response(res, 500, 'Oops! unexpected things happened into server', true);
    }
    const { rows, rowCount } = result;
    if (rowCount > 0) {
      const [firstItem] = rows; // get first return item
      return response(res, 200, firstItem);
    }
    return response(res, 404, 'No property found', true);
  }

  // create a new property adverts
  // eslint-disable-next-line consistent-return
  static addNewProperty(req, res) {
    const { price, state, city, address, type } = req.body;
    if (!req.files.image) {
      return response(res, 400, 'image required', true);
    }
    const propertyImage = req.files.image.path;
    cloudinary.uploader.upload(propertyImage, async (result, error) => {
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
        owner: req.user.id,
        status: 'available',
        created_on: moment().format(),
        image_url: result.url
      };
      const { error: errors, response: resp } = await insert('properties', newProperty);
      if (errors) {
        return response(res, 500, 'Oops! unexpected things happened into server', true);
      }
      const { rows, rowCount } = resp;
      if (rowCount > 0) {
        const [addedProperty] = rows;
        return response(res, 201, addedProperty);
      }
      return response(res, 400, 'nothing inserted try again!', true);
    });
  }

  static async deleteProperty(req, res) {
    const { id } = req.params;
    // retrieve property first
    const { response: property } = await findOne('properties', 'id', parseInt(id, 10));
    // check if we got anything
    const { rows, rowCount } = property;
    if (rowCount > 0) {
      const [prop] = rows;
      if (req.user.id === prop.owner || req.user.is_admin === true) {
        const { error, response: result } = await deleteItem('properties', 'id', parseInt(id, 10));
        if (!error) {
          const { rowCount: count } = result;
          if (count > 0) {
            return response(res, 200, 'Property deleted successfully', false, true);
          }
        }
        return response(res, 500, 'Oops! unexpected things happened into server', true);
      }
      return response(res, 403, { message: 'You are allowed to delete your property only!' }, true);
    }
    return response(res, 404, 'no property found!', true);
  }

  static async updateProperty(req, res) {
    const { id } = req.params;
    // retrieve property first
    const { response: props } = await findOne('properties', 'id', parseInt(id, 10));
    // check if we got anything
    const { rows, rowCount } = props;
    if (rowCount > 0) {
      const [prop] = rows;
      if (req.user.id === prop.owner || req.user.is_admin === true) {
        const property = {};
        const keys = Object.keys(req.body);
        keys.forEach(key => {
          property[key] = req.body[key];
        });

        const { error, response: result } = await update(
          'properties',
          property,
          'id',
          parseInt(id, 10)
        );
        if (error) {
          return response(res, 500, 'Oops! unexpected things happened into server', true);
        }
        const { rows: items, rowCount: counts } = result;
        if (counts > 0) {
          const [item] = items;
          return response(res, 200, item);
        }
      }
      return response(res, 403, { message: 'You are allowed to update your property only!' }, true);
    }
    return response(res, 404, 'property your are trying to update is not available!', true);
  }

  // mark property as sold
  static async markPropertyAsSold(req, res) {
    const { id } = req.params;
    // retrieve property first
    const { response: props } = await findOne('properties', 'id', parseInt(id, 10));
    // check if we got anything
    const { rows, rowCount } = props;
    if (rowCount > 0) {
      const [prop] = rows;
      if (req.user.id === prop.owner || req.user.is_admin === true) {
        const payload = { status: 'sold' };
        const { response: result } = await update('properties', payload, 'id', parseInt(id, 10));
        const { rows: items, rowCount: counts } = result;
        if (counts > 0) {
          const [item] = items;
          return response(res, 200, item);
        }
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
  static async viewPropertiesByType(req, res) {
    if (!req.query.type) {
      return response(res, 400, 'provide query params type', true);
    }
    const { response: result } = await findAll('properties', 'type', req.query.type.trim());
    const { rows, rowCount } = result;
    if (rowCount > 0) {
      return response(res, 200, rows);
    }
    return response(res, 404, 'No available properties of such a type', true);
  }
}

export default PropertyController;
