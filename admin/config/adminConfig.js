import { dark, light } from '@adminjs/themes';
// =====
import createContestResource from '../resources/Contests.js';
import createOffersResource from '../resources/Offers.js';
import createUsersResource from '../resources/Users.js';
import { componentLoader } from '../components/index.js';

const options = async () => {
  return {
    resources: [
      await createContestResource(),
      await createOffersResource(),
      await createUsersResource()
    ],
    defaultTheme: dark.id,
    availableThemes: [dark, light],
    componentLoader
  }
}

export default options;