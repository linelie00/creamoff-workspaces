const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize; // sequelize 인스턴스 임포트

const User = sequelize.define('TB_USERS', {
  platform_id: {
    type: DataTypes.STRING(200),
    allowNull: false, // 복합 키로 사용하기 위해 필수로 설정
  },
  platform: {
    type: DataTypes.STRING(20),
    allowNull: false, // 복합 키로 사용하기 위해 필수로 설정
  },
  user_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '',
  },
  user_nickname: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '',
  },
  user_email: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  user_phone: {
    type: DataTypes.STRING(20), // 예: 문자열 형태로 저장, 필요에 따라 데이터 타입을 조정할 수 있음
    allowNull: true, // 전화번호는 선택적 정보일 수 있음
    defaultValue: '',
  },
  user_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: '',
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
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['platform_id', 'platform'], // 복합 키 설정
    },
  ],
});

module.exports = User;
