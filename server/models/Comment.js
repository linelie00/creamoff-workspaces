const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const Comment = sequelize.define('TB_COMMENTS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    post_id: {
        type: DataTypes.INTEGER,
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
    contents: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Comment;