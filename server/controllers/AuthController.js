import Mailgun from 'mailgun-js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Respond from '../helpers/ResponseHandler';
import AuthHelper from '../helpers/AuthHelper';
import DbHelper from '../helpers/DbHelper';

dotenv.config();
const { MAILGUN_API_KEY } = process.env;
// configure mailgun
const domain = 'mucyofred.com';
// eslint-disable-next-line camelcase
const from_who = 'no-reply@mucyofred.com';
// eslint-disable-next-line camelcase
const api_key = MAILGUN_API_KEY;
const mailgun = new Mailgun({ apiKey: api_key, domain });

const { jwtSign, hashPassword, comparePassword } = AuthHelper;
const { response } = Respond;
const { findOne, insert, update } = DbHelper;
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

  static async resetPassword(req, res) {
    const { email } = req.params;
    // eslint-disable-next-line camelcase
    const { new_password, password } = req.body;

    const { error, response: result } = await findOne('users', 'email', email);
    if (error) {
      return response(res, 500, 'Oops! unexpected things happened into server', true);
    }
    const { rows, rowCount } = result;
    if (rowCount > 0) {
      const [user] = rows; // here we have user object
      // if old password is available checks if it's valid and reset to the new one
      // eslint-disable-next-line camelcase
      if (password && new_password) {
        const checkPass = comparePassword(password, user.password);
        if (checkPass) {
          const hashedPassword = hashPassword(new_password);
          const payload = {
            password: hashedPassword
          };
          const { error: failfirst } = await update('users', payload, 'id', user.id);
          if (failfirst) {
            return response(res, 500, 'Oops! unexpected things happened into server', true);
          }
          return response(res, 200, 'password reset successful');
        }
        return response(res, 400, 'Invalid old password supplied!', true);
      }
      // go ahead and send reset email with random temporary email
      const randpass = crypto.randomBytes(3).toString('hex');
      const hash = hashPassword(randpass);
      const payload = {
        password: hash
      };
      const { error: failfirst } = await update('users', payload, 'id', user.id);
      if (failfirst) {
        return response(res, 500, 'Oops! unexpected things happened into server', true);
      }
      const data = {
        from: from_who,
        to: email,
        subject: 'PropertyPro-Lite Password Reset',
        html: `<b>You Requested Password Reset</b> <br>
         Your new password is <b>${randpass}</b><br>
         Thank You from property pro lite team.
      `
      };
      // Invokes the method to send emails given the above data with the helper library
      mailgun.messages().send(data, (err, body) => {
        // If there is an error, render the error page
        if (err) {
          return response(
            res,
            500,
            'unexpected error happened while sending reset email to client!',
            true
          );
        }
      });
      return response(res, 200, 'reset email sent successful!');
    }
    return response(res, 404, 'No user exists with such email provided!', true);
  }
}
export default AuthController;
