const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const ReservationPriceRS = sequelize.define('TB_RESERVATION_PRICE_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    price_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = ReservationPriceRS;