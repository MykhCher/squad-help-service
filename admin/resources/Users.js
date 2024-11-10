import dbCon from '../config/dbConfig.js';

async function Users() {
  const db = await dbCon;

  return {
    resource: db.table('Users'),
    options: {
      navigation: false,
      actions: {
        new: {
          isAccessible: false
        },
        list: {
          isAccessible: false
        },
        edit: {
          isAccessible: false
        },
        delete: {
          isAccessible: false
        },
        bulkDelete: {
          isAccessible: false
        },
      }
    }
  }
}

export default Users;