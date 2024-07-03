const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Pet = require('./Pet');
const Reservation = require('./Reservation');
const NoticeStatusOfPart = require('./NoticeStatusOfPart');

const Notice = sequelize.define('TB_NOTICES', {
    notice_id: {
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
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_RESERVATIONS',
            key: 'reservation_id',
        },
    },
    pet_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_NOTICE_STATUS_OF_PARTS',
            key: 'id',
        },
    },
    etc_note: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    review_write: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의 

Notice.belongsTo(Pet, { foreignKey: 'pet_id', targetKey: 'pet_id' });
Notice.belongsTo(Reservation, { foreignKey: 'reservation_id', targetKey: 'reservation_id' });
Notice.belongsTo(NoticeStatusOfPart, { foreignKey: 'pet_status', targetKey: 'id' });

module.exports = Notice;