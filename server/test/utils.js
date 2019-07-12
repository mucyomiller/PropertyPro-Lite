import users from '../model/users';
import AuthHelper from '../helpers/AuthHelper';
// destructure users out of users array
const [regularUser1, regugalarUser2, adminUser] = users;
const { jwtSign } = AuthHelper;
export default {
  getUserToken: n => {
    if (n === 1) {
      return jwtSign(regularUser1);
    }
    return jwtSign(regugalarUser2);
  },
  getAdminToken: () => jwtSign(adminUser)
};
