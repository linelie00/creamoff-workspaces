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
        references: {
            model: 'TB_PET_SPECIES',
            key: 'id',
        },
    },
    option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PET_OPTIONS',
            key: 'id',
        },
    },
}, {
    timestamps: false,
});

module.exports = PetOptionRS;