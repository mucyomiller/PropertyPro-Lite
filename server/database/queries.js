const dropUsersTable = `drop table users`;
const dropPropertiesTable = `drop table properties`;

const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR (255) NOT NULL UNIQUE,
        first_name VARCHAR (255) NOT NULL ,
        last_name VARCHAR (255) NOT NULL,
        address VARCHAR (255),
        phone_number VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false
        )
      `;
const createPropertiesTable = `
       CREATE TABLE IF NOT EXISTS properties(
         id SERIAL PRIMARY KEY,
         owner INTEGER,
         status VARCHAR (255) DEFAULT 'available',
         price INTEGER NOT NULL,
         state VARCHAR (255) NOT NULL,
         city VARCHAR (255) NOT NULL,
         address VARCHAR (255) NOT NULL,
         type VARCHAR (255) NOT NULL,
         image_url TEXT, 
         created_on TIMESTAMP,
         FOREIGN KEY (owner) REFERENCES users (id)
       )
      `;

export default {
  dropUsersTable,
  dropPropertiesTable,
  createUsersTable,
  createPropertiesTable
};
