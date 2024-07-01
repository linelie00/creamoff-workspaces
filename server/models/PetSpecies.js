const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize; // sequelize 인스턴스 임포트

const PetSpecies = sequelize.define('TB_PET_SPECIES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    species: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
})

module.exports = PetSpecies;