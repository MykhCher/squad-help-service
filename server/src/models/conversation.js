'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {

    static associate(models) {
      conversation.belongsToMany(models.Users, {
        through: 'usersConversations', 
        foreignKey: 'conversationId',
        otherKey: 'userId'  
      });
      conversation.hasMany(models.message, {foreignKey: 'conversationId', sourceKey: 'id'});
    }
  }

  conversation.init({
    blackList: DataTypes.ARRAY(DataTypes.BOOLEAN),
    favoriteList: DataTypes.ARRAY(DataTypes.BOOLEAN)
  }, {
    sequelize,
    modelName: 'conversation',
  });
  return conversation;
};