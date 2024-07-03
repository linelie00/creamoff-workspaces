const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const BeautyWeight = sequelize.define('TB_BEAUTY_WEIGHTS', {
    weight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    weight: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamps: false,
});

module.exports = BeautyWeight;