
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Events', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: 'My Event',
            allowNull: false,
        },
        eventTime: {
            type: Sequelize.DATE
        },
        elapsed: {
            type: Sequelize.BOOLEAN
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Events');
    },
  };
  