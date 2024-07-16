const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Reservation = require('./Reservation');
const BeautyPrice = require('./BeautyPrice');

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
        references: {
            model: 'TB_BEAUTY_PRICES',
            key: 'id',
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
}, {
    timestamps: false,
});

// 외래 키 관계 정의
ReservationPriceRS.belongsTo(Reservation, { foreignKey: 'reservation_id', targetKey: 'reservation_id' });
ReservationPriceRS.belongsTo(BeautyPrice, { foreignKey: 'price_id', targetKey: 'id' });

module.exports = ReservationPriceRS;