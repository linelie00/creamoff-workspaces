const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const ReservationSpecialNote = sequelize.define('TB_RESERVATION_SPECIAL_NOTES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    special_note: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamps: false,
});

module.exports = ReservationSpecialNote;