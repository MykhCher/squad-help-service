'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usersConversations extends Model {

    static associate(models) {
      usersConversations.belongsTo(models.Users, {foreignKey: 'userId'});
      usersConversations.belongsTo(models.conversation, {foreignKey: 'conversationId'});
    }
  }
  usersConversations.init({
    userId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersConversations',
    tableName: 'usersConversations',
    timestamp: false
  });
  return usersConversations;
};