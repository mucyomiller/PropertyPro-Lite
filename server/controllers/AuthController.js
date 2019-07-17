import Respond from '../helpers/ResponseHandler';
import AuthHelper from '../helpers/AuthHelper';
import users from '../model/users';
import DbHelper from '../helpers/DbHelper';

const { jwtSign, hashPassword, comparePassword } = AuthHelper;
const { response } = Respond;
const { findOne } = DbHelper;
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
    const { password: p, ...patchedUser } = user; // remove password from object
    users.push(user);
    // generate token
    const token = jwtSign(patchedUser);
    const patchedUserWithToken = { token, ...patchedUser };
    return response(res, 201, patchedUserWithToken);
  }

  static async signIn(req, res) {
    const { email, password: pass } = req.body;
    const { error, response: result } = await findOne('users', 'email', email);
    if (error) {
      return response(res, 500, error, true);
    }
    const { rows, rowCount } = result;
    if (rowCount > 0) {
      // compare password
      const [currentUser] = rows;
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
