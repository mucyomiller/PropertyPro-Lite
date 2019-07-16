import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Respond from '../../helpers/ResponseHandler';
import DbHelper from '../../helpers/DbHelper';

dotenv.config();

const { CLOUDNARY_NAME, CLOUDNARY_API_KEY, CLOUDNARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDNARY_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECRET
});

const { response } = Respond;

// db helpers  funcs
const { queryAll } = DbHelper;

class PropertyController {
  // view all properties
  static async viewAllProperties(req, res) {
    const { error, response: result } = await queryAll('properties');
    if (error) {
      return response(res, 404, error, true);
    }
    const { rows, rowCount } = result;
    if (rowCount > 0) {
      return response(res, 200, rows);
    }
    return response(res, 200, 'no properties found!');
  }
}

export default PropertyController;
