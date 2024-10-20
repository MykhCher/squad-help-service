'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class catalog extends Model {
    
    static associate(models) {
      catalog.belongsToMany(models.conversation, {
        through: 'chats', 
        foreignKey: 'catalogId', 
        otherId: 'conversationId'
      });
      catalog.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id'})
    }
  }
  catalog.init({
    catalogName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    }
  }, {
    sequelize,
    modelName: 'catalog',
  });
  return catalog;
};