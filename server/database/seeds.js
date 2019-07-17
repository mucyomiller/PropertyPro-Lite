import users from '../model/users';
import properties from '../model/properties';

import DbHelper from '../helpers/DbHelper';

const { query } = DbHelper;

const usersTableSeedsQuery = `
        INSERT INTO users(email,first_name,last_name,address,phone_number,password,is_admin) 
        values($1,$2,$3,$4,$5,$6,$7);
      `;

const propertiesTableSeedsQuery = `
      INSERT INTO properties(owner,price,state,city,address,type,image_url,created_on)
        values($1,$2,$3,$4,$5,$6,$7,$8);
      `;

const usersTableSeeder = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const user of users) {
    // eslint-disable-next-line no-await-in-loop
    await query(usersTableSeedsQuery, [
      user.email,
      user.first_name,
      user.last_name,
      user.address,
      user.phone_number,
      user.password,
      user.is_admin
    ]);
  }
};

const propertiesTableSeeder = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop of properties) {
    // eslint-disable-next-line no-await-in-loop
    await query(propertiesTableSeedsQuery, [
      prop.owner,
      prop.price,
      prop.state,
      prop.city,
      prop.address,
      prop.type,
      prop.image_url,
      prop.created_on
    ]);
  }
};

export default {
  usersTableSeeder,
  propertiesTableSeeder
};
