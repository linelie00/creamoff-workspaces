const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const User = require('./User');
const Authority = require('./Authority');

const UserAuthority = sequelize.define('TB_USER_AUTHS', {
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
        references: {
            model: 'TB_USERS',
            key: 'platform'
        }
    },
    authority_id: {
        type: DataTypes.STRING(8),
        allowNull: false,
        references: {
            model: 'tb_authorities',
            key: 'id'
        }
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['platform_id', 'platform', 'authority_id'],
        },
    ],
});

// 외래 키 관계 설정
UserAuthority.belongsTo(User, { foreignKey: 'platform_id', targetKey: 'platform_id' });
UserAuthority.belongsTo(User, { foreignKey: 'platform', targetKey: 'platform' });
UserAuthority.belongsTo(Authority, { foreignKey: 'authority_id', targetKey: 'id' });

module.exports = UserAuthority;
