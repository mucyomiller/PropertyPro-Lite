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
    const currentUser = users.find(user => user.email === email && user.password === pass);
    if (currentUser) {
      const { password, ...patchedUser } = currentUser;
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
