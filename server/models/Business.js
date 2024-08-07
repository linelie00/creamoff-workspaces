const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;

const Business = sequelize.define('TB_BUSINESSES', {
    id: {
        type: DataTypes.STRING(200),
        allowNull: false,
        primaryKey: true,
    },
    category: {
        type: DataTypes.ENUM('beauty', 'food', 'shopping', 'kindergarten', 'hotel', 'etc'),
        allowNull: false,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
    },
    location: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
    grade: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 5.0,
    },
    weekday_open_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    weekday_close_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    weekend_open_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    weekend_close_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    dayon: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '매일',
    },
    dayoff: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '연중무휴',
    },
    store_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
    contents: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    business_registration_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
    },
    business_registration_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
    business_owner: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

module.exports = Business;