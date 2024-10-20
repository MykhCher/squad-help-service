'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      catalogId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'catalogs',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      conversationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'conversations',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};