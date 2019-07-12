import JWT from '../helpers/JWT';
import Respond from '../helpers/ResponseHandler';
// retreive needed funcs
const { jwtVerifiy } = JWT;
// get response func
const { response } = Respond;

class Authorization {
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
        return response(res, 400, JsonWebTokenError, true);
      }
    }
    return res.status(401).json({
      status: res.statusCode,
      message: 'authorization failed!'
    });
  }
}

export default Authorization;
