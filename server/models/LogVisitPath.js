const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const PathList = require('./PathList');

const LogVisitPath = sequelize.define('TB_LOG_VISIT_PATHS', {
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
    visit_path: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PATH_LISTS',
            key: 'id',
        },
    },
    user_ip: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '0.0.0.0',
    },
    last_visit_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, {
    timestamps: false,
});

// 외래 키 관계 정의
LogVisitPath.belongsTo(PathList, { foreignKey: 'visit_path', targetKey: 'id' });

module.exports = LogVisitPath;