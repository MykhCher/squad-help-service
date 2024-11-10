import dbCon from '../config/dbConfig.js';
import { Components } from '../components/index.js';

const ContestResource = async () => {
  const db = await dbCon;
  const visibleProperties = ['id', 'contestType', 'title', 'status', 'prize', 'priority', 'createdAt'];

  return {
    resource: db.table('Contests'),
    options: {
      listProperties: visibleProperties,
      filterProperties: visibleProperties,
      editProperties: visibleProperties,
      showProperties: visibleProperties,
      navigation: {
        icon: 'Database',
      },
      sort: {
        direction: 'asc',
        sortBy: 'id'
      },
      actions: {
        showAllOffers: {
          actionType: 'record',
          component: Components.ContestOffers,
          handler: async (req, res, context) => {

            const offers = await db.table('Offers')
              .knex.select()
              .from('Offers')
              .where({'contestId': context.record.id(), 'revised': false})
              .orderBy('id', 'asc');

            context.record.params.offers = offers;

            return {
              record: context.record.toJSON(),
            }
          }
        },
        new: {
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

export default ContestResource;