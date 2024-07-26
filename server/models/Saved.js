const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Beauty = require('./Business');

const Saved = sequelize.define('TB_SAVEDS', {
    id: {
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
    beauty_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: 'TB_BUSINESSES',
            key: 'id',
        },
    },
    save_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의
Saved.belongsTo(Beauty, { foreignKey: 'beauty_id', targetKey: 'id' });

module.exports = Saved;