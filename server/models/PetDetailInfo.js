const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const PetDetailInfo = sequelize.define('TB_PET_DETAIL_INFOS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    information: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamps: false,
});

module.exports = PetDetailInfo;