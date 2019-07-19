import AuthHelper from '../helpers/AuthHelper';
import Respond from '../helpers/ResponseHandler';
// retreive needed funcs
const { jwtVerifiy } = AuthHelper;
// get response func
const { response } = Respond;

class Authentication {
  static checkToken(req, res, next) {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      try {
        const decoded = jwtVerifiy(token);
        const { iat, exp, ...user } = decoded;
        req.user = user;
        return next();
      } catch (JsonWebTokenError) {
        return response(res, 400, 'Invalid signature or malformatted JWT token', true);
      }
    }
    return res.status(401).json({
      status: res.statusCode,
      message: 'Authentication failed!'
    });
  }
}

export default Authentication;
