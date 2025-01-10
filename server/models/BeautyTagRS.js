const { DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const BeautyTagRS = sequelize.define('TB_BEAUTY_TAG_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    business_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = BeautyTagRS;