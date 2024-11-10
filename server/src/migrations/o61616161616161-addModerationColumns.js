
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Offers', 'approved', Sequelize.BOOLEAN);
    await queryInterface.addColumn('Offers', 'revised', Sequelize.BOOLEAN);
    await queryInterface.sequelize.query(`
      ALTER TABLE "Offers" ALTER COLUMN "approved" SET DEFAULT false;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "Offers" ALTER COLUMN "revised" SET DEFAULT false;
    `);

    await queryInterface.changeColumn('Users', 'role', { type: Sequelize.STRING });
    await queryInterface.sequelize.query('DROP TYPE "enum_Users_role";');

    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Users_role" AS ENUM('customer', 'creator', 'moderator');
    `);

    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('customer', 'creator', 'moderator'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Offers', 'approved');
    await queryInterface.removeColumn('Offers', 'revised');

    await queryInterface.changeColumn('Users', 'role', { type: Sequelize.STRING });
    await queryInterface.sequelize.query('DROP TYPE "enum_Users_role";');

    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Users_role" AS ENUM('customer', 'creator');
    `);

    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('customer', 'creator'),
    });
  },
};
