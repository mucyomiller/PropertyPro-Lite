import Respond from '../helpers/ResponseHandler';
import AuthHelper from '../helpers/AuthHelper';
import DbHelper from '../helpers/DbHelper';

const { jwtSign, hashPassword, comparePassword } = AuthHelper;
const { response } = Respond;
const { findOne, insert } = DbHelper;
class AuthController {
  static async signUp(req, res) {
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
    // checks if email already exists!
    const { error: failfirst, response: firstresult } = await findOne('users', 'email', user.email);
    if (failfirst) {
      return response(res, 500, 'Oops! unexpected things happened into server', true);
    }
    if (firstresult.rowCount > 0) {
      return response(res, 409, 'there is already exists user with that email!', true);
    }
    const { error, response: result } = await insert('users', user);
    if (error) {
      // return 400 cause user can supply already exists email!.
      return response(res, 400, error, true);
    }
    const [insertedUser] = result.rows;
    const { password: p, ...patchedUser } = insertedUser;
    // generate token
    const token = jwtSign(patchedUser);
    const patchedUserWithToken = { token, ...patchedUser };
    return response(res, 201, patchedUserWithToken);
  }

  static async signIn(req, res) {
    const { email, password: pass } = req.body;
    const { error, response: result } = await findOne('users', 'email', email);
    if (error) {
      return response(res, 500, 'Oops! unexpected things happened into server', true);
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
