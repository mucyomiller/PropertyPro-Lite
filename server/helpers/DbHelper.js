import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL } = process.env;

const connectionString = DATABASE_URL;
export const pool = new Pool({
  connectionString
});
class DbHelper {
  static async query(query, params) {
    try {
      const client = await pool.connect();
      const result = await client.query(query, params);
      client.release();
      return { error: null, response: result };
    } catch (Error) {
      return { error: Error, response: null };
    }
  }

  static async queryAll(tablename) {
    if (tablename) {
      const q = `SELECT * FROM ${tablename}`;
      return DbHelper.query(q);
    }
    return { error: 'provide table name', response: null };
  }

  static async find(tablename, column, value) {
    if (tablename && column && value) {
      const q = `SELECT * FROM ${tablename} WHERE ${column}=$1`;
      return DbHelper.query(q, [value]);
    }
    return { error: 'provide table name & column & value', response: null };
  }

  static async findOne(tablename, column, value) {
    if (tablename && column && value) {
      const q = `SELECT * FROM ${tablename} WHERE ${column}=$1 LIMIT 1`;
      return DbHelper.query(q, [value]);
    }
    return { error: 'provide table name & column & value', response: null };
  }

  static async insert(tablename, data) {
    // let's build query
    const q = `INSERT INTO ${tablename}`;
    const queryBuilder = DbHelper.buildInsert(q, data);
    return DbHelper.query(queryBuilder.sql, queryBuilder.values);
  }

  static buildInsert(query, data) {
    const params = [];
    const chunks = [];
    const values = [];
    const keys = [];
    Object.keys(data).forEach(key => {
      keys.push(key);
      params.push(data[key]);
      values.push(`$${params.length}`);
    });
    chunks.push(`(${values.join(', ')})`);
    return {
      sql: `${query}(${keys.join(', ')}) values${chunks.join(', ')} RETURNING *`,
      values: params
    };
  }
}

export default DbHelper;
