const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const BeautyImage = sequelize.define('TB_BEAUTY_IMAGES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
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
    },
}, {
    timestamps: false,
});

module.exports = BeautyImage;