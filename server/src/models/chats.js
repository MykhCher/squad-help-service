'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    
    static associate(models) {
      chats.belongsTo(models.catalog, {foreignKey: 'catalogId'});
      chats.belongsTo(models.conversation, {foreignKey: 'conversationId'});
    }
  }
  chats.init({
    catalogId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chats',
    tableName: 'chats',
    timestamp: false
  });
  return chats;
};