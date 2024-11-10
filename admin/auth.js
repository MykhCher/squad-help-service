import bcrypt from 'bcrypt';
// =====
import dbCon from './config/dbConfig.js';

const authenticate = async ({ email, password }, ctx) => {
  const db = await dbCon;
  const [ user ] = await db.table('Users').knex.select().from('Users').where({ email });

  if (
    user
    && bcrypt.compareSync(password, user.password)
    && user.role === 'moderator'
  ) {
    return Promise.resolve(user);
  }

  return null;
}

export default authenticate;