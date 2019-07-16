/* eslint-disable no-console */
import DbHelper from '../helpers/DbHelper';
import Queries from './queries';
import Seeders from './seeds';

const { query } = DbHelper;
// tables
const { dropUsersTable, dropPropertiesTable, createUsersTable, createPropertiesTable } = Queries;
const { usersTableSeeder, propertiesTableSeeder } = Seeders;

const initDB = async () => {
  await query(dropPropertiesTable);
  await query(dropUsersTable);
  await query(createUsersTable);
  await query(createPropertiesTable);
  // start seeding
  await usersTableSeeder();
  await propertiesTableSeeder();
};

initDB();
