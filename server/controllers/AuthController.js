import Respond from '../helpers/ResponseHandler';
import AuthHelper from '../helpers/AuthHelper';
import users from '../model/users';

const { jwtSign, hashPassword, comparePassword } = AuthHelper;
const { response } = Respond;
class AuthController {
  static signUp(req, res) {
    // eslint-disable-next-line camelcase
    const { email, first_name, last_name, address, phone_number, password } = req.body;
    // hash password
    const hashedPassword = hashPassword(password);
    const user = {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      password: hashedPassword,
      is_admin: false
    };
    const { password: p, ...patchedUser } = user;
    users.push(user);
    // generate token
    const token = jwtSign(patchedUser);
    const OutUser = { token, ...patchedUser };
    return response(res, 200, OutUser);
  }

  // eslint-disable-next-line consistent-return
  static signIn(req, res) {
    const { email, password: pass } = req.body;
    const currentUser = users.find(user => user.email === email);
    if (currentUser) {
      // compare password
      const checkPass = comparePassword(pass, currentUser.password);
      if (checkPass) {
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
    }
    return response(res, 400, 'invalid email or password');
  }
}
export default AuthController;
