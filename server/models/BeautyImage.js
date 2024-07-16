const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const BeautyImage = sequelize.define('TB_BEAUTY_IMAGES', {
    image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamps: false,
});

module.exports = BeautyImage;