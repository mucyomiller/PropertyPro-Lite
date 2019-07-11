import Respond from '../helpers/ResponseHandler';
import JWT from '../helpers/JWT';
import users from '../model/users';

const { jwtSign } = JWT;
const { response } = Respond;
class AuthController {
  static signUp(req, res) {
    Respond.response(res, 200, 'ok');
  }

  // eslint-disable-next-line consistent-return
  static signIn(req, res) {
    const { email, password: pass } = req.body;
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      const { password, ...patchedUser } = user;
      const token = jwtSign(patchedUser);
      return res.status(200).json({
        status: 'success',
        data: {
          token,
          ...patchedUser
        }
      });
    }
    return response(res, 400, 'invalid email or password');
  }
}
export default AuthController;
