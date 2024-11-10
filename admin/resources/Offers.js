import dbCon from '../config/dbConfig.js';

async function Offers() {
  const db = await dbCon;

  return {
    resource: db.table('Offers'),
    options: {
      navigation: false,
      actions: {
        approveOffer: {
          actionType: 'record',
          component: false,
          handler: async (req, res, context) => {
            const offer = await db.table('Offers')
              .knex.update({
                approved: true,
                revised: true 
              })
              .from('Offers')
              .where({id: context.record.params.id});

            return {record: context.record.toJSON()}
          }
        },
        declineOffer: {
          actionType: 'record',
          component: false,
          handler: async (req, res, context) => {
            const offer = await db.table('Offers')
              .knex.update({
                approved: false,
                revised: true 
              })
              .from('Offers')
              .where({id: context.record.params.id});

            return {record: context.record.toJSON()}
          }
        },
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

export default Offers;