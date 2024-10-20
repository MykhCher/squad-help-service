'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class message extends Model {

    static associate(models) {
      message.belongsTo(models.conversation, {foreignKey: 'conversationId', targetKey: 'id'});
      message.belongsTo(models.Users, {foreignKey: 'sender', targetKey: 'id'});
    }
  }

  message.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sender: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    conversationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'coversations',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};