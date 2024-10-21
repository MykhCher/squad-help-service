'use strict';
const { Model } = require('sequelize');
const { blackList } = require('../controllers/chatController');

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
    blackList: DataTypes.BOOLEAN,
    favoriteList: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'usersConversations',
    tableName: 'usersConversations',
    timestamp: false
  });
  return usersConversations;
};