const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const NoticePart = require('./NoticePart');
const NoticeStatus = require('./NoticeStatus');
const Reservation = require('./Reservation');

const NoticeStatusOfPart = sequelize.define('TB_NOTICE_STATUS_OF_PARTS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_NOTICE_PARTS',
            key: 'part_id',
        },
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_NOTICE_STATUSES',
            key: 'status_id',
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
NoticeStatusOfPart.belongsTo(NoticePart, { foreignKey: 'part_id', targetKey: 'part_id' });
NoticeStatusOfPart.belongsTo(NoticeStatus, { foreignKey: 'status_id', targetKey: 'status_id' });
NoticeStatusOfPart.belongsTo(Reservation, { foreignKey: 'reservation_id', targetKey: 'reservation_id' });

module.exports = NoticeStatusOfPart;