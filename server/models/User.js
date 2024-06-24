// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

const User = sequelize.define('TB_USER', {
  user_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '',
  },
  user_email: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  user_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: '',
  },
  user_password: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  platform_id: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false, // 이 옵션이 설정되면 자동으로 created_at, updated_at을 관리하지 않습니다.
});

module.exports = User;
