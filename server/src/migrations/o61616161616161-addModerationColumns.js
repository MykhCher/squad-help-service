
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Offers', 'approved', Sequelize.BOOLEAN, { defaultValue: false });
    await queryInterface.addColumn('Offers', 'revised', Sequelize.BOOLEAN, { defaultValue: false });
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('customer', 'creator', 'moderator'),
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "Offers" ALTER COLUMN "approved" SET DEFAULT false;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "Offers" ALTER COLUMN "revised" SET DEFAULT false;
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Offers', 'approved');
    await queryInterface.removeColumn('Offers', 'revised');

    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('customer', 'creator'),
    });
  },
};
