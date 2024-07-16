const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const ReservationSpecialNote = require('./ReservationSpecialNote');
const PetSpecies = require('./PetSpecies');

const PetSpeciesSpecialNote = sequelize.define('TB_PET_SPECIES_SPECIAL_NOTES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    special_note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_RESERVATION_SPECIAL_NOTES',
            key: 'id',
        },
    },
    pet_species: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PET_SPECIES',
            key: 'id',
        },
    },
}, {
    timestamps: false,
});

// 외래 키 관계
PetSpeciesSpecialNote.belongsTo(ReservationSpecialNote, { foreignKey: 'special_note', targetKey: 'id' });
PetSpeciesSpecialNote.belongsTo(PetSpecies, { foreignKey: 'pet_species', targetKey: 'id' });

module.exports = PetSpeciesSpecialNote;