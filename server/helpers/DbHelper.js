import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URI } = process.env;

const connectionString = DB_URI;
const pool = new Pool({
  connectionString
});

class DbHelper {
  static async query(query, params) {
    try {
      const result = await pool.query(query, params);
      return { error: null, response: result };
    } catch (Error) {
      return { error: Error, response: null };
    }
  }
}

export default DbHelper;
