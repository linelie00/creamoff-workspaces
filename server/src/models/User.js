const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
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
    timestamps: false,
  });

  return User;
};
