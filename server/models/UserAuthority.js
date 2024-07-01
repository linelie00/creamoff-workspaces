const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize; // sequelize 인스턴스 임포트
const User = require('./User');
const Authority = require('./Authority');


// 이녀석이 문제예요 선생님!!!!!!!!!!!!! 
const UserAuthority = sequelize.define('TB_USER_AUTHORITIES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: User,
            key: 'platform_id',
        },
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: User,
            key: 'platform',
        },
    },
    authority: {
        type: DataTypes.STRING(8),
        allowNull: false,
        references: {
            model: Authority,
            key: 'id',
        },
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['platform_id', 'platform', 'authority'],
        },
    ],
});

UserAuthority.belongsTo(User, { foreignKey: 'platform_id', targetKey: 'platform_id' });
UserAuthority.belongsTo(User, { foreignKey: 'platform', targetKey: 'platform' });
UserAuthority.belongsTo(Authority, { foreignKey: 'authority', targetKey: 'id' });

module.exports = UserAuthority;