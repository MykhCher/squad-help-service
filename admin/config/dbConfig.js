import { Adapter } from '@adminjs/sql';
import Connect from 'connect-pg-simple';
import session from 'express-session';
// =====
import {
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  DB_HOST
} from '../constants/index.js';

const connectionString = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const db = new Adapter('postgresql', {
  connectionString,
  database: DB_NAME,
}).init()


export default db;

const ConnectSession = Connect(session);
export const sessionStore = new ConnectSession({
  conObject: {
    connectionString,
  },
  tableName: 'session',
  createTableIfMissing: true,
})