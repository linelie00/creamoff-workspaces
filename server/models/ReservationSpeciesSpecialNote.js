const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Pet = require('./Pet');
const Reservation = require('./Reservation');
const ReservationSpecialNote = require('./ReservationSpecialNote');

const ReservationSpeciesSpecialNote = sequelize.define('TB_RESERVATION_SPEIES_SPECIAL_NOTES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PETS',
            key: 'pet_id',
        },
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_RESERVATIONS',
            key: 'reservation_id',
        },
    },
    special_note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_RESERVATION_SPECIAL_NOTES',
            key: 'id',
        },
    },
    whether: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의
ReservationSpeciesSpecialNote.belongsTo(Pet, { foreignKey: 'pet_id', targetKey: 'pet_id' });
ReservationSpeciesSpecialNote.belongsTo(Reservation, { foreignKey: 'reservation_id', targetKey: 'reservation_id' });
ReservationSpeciesSpecialNote.belongsTo(ReservationSpecialNote, { foreignKey: 'special_note', targetKey: 'id' });

module.exports = ReservationSpeciesSpecialNote;