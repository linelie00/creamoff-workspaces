const { Sequelize, DataTypes } = require('sequelize');
const PetSpecies = require('./PetSpecies');
const PetBreed = require('./PetBreed');
const sequelize = require('../models').sequelize;

const Pet = sequelize.define('TB_PETS', {
    pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    pet_species: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pet_breed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pet_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
    },
    pet_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '2000-01-01',
    },
    pet_weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    pet_gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    pet_etc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = Pet;