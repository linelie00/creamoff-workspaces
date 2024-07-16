const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const BeautyImage = require('./BeautyImage');

const Beauty = sequelize.define('TB_BEAUTIES', {
    beauty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    title_image: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_BEAUTY_IMAGES',
            key: 'image_id',
        },
    },
    beauty_name: {
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
        defaultValue: 0.0,
    },
    weekday_open_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    weekday_close_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    weekend_open_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    weekend_close_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    dayoff: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '연중무휴',
    },
    contact_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
    contents: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamps: false,
});

Beauty.belongsTo(BeautyImage, { foreignKey: 'title_image', targetKey: 'image_id' });

module.exports = Beauty;