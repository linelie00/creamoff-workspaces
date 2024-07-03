const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const BeautyStyle = sequelize.define('TB_BEAUTY_STYLES', {
    style_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    style: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
    is_plus_option: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

module.exports = BeautyStyle;