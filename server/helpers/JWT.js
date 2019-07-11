import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET } = process.env;
class JWT {
  static jwtSign(user) {
    // remove password from User Model
    const { password, ...patchedUser } = user;
    return jwt.sign(patchedUser, JWT_SECRET, { expiresIn: '24h' });
  }

  static jwtVerifiy(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  }
}

export default JWT;
