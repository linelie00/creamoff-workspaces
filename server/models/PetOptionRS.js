const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;

const PetOptionRS = sequelize.define('TB_PET_OPTION_RS', {
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
    option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = PetOptionRS;