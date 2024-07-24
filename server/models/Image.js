const { DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const Image = sequelize.define('TB_IMAGES', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Image;