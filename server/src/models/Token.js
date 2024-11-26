'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' })
    }
  }
  Token.init({
    userId: DataTypes.INTEGER,
    refreshToken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};