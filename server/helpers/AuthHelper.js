import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const { JWT_SECRET } = process.env;
const SaltRounds = 8;

class AuthHelper {
  static jwtSign(user) {
    // remove password from User Model
    const { password, ...patchedUser } = user;
    return jwt.sign(patchedUser, JWT_SECRET, { expiresIn: '24h' });
  }

  static jwtVerifiy(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SaltRounds));
  }
}

export default AuthHelper;
