const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const PetBreed = sequelize.define('TB_PET_BREEDS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    species_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    }
}, {
    timestamps: false,
});

module.exports = PetBreed;