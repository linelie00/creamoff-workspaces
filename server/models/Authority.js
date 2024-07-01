const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize; // sequelize 인스턴스 임포트

const Authority = sequelize.define('TB_AUTHORITIES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    authority: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
    is_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
    is_entrepreneur: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
})