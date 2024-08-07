const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Beauty = require('./Business');
const BeautyStyle = require('./BeautyStyle');
const BeautyWeight = require('./BeautyWeight');

const BeautyPrice = sequelize.define('TB_BEAUTY_PRICES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    beauty_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: 'TB_BUSINESSES',
            key: 'id',
        },
    },
    weight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_BEAUTY_WEIGHTS',
            key: 'weight_id',
        },
    },
    style_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_BEAUTY_STYLES',
            key: 'style_id',
        },
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의
BeautyPrice.belongsTo(Beauty, { foreignKey: 'beauty_id', targetKey: 'id' });
BeautyPrice.belongsTo(BeautyStyle, { foreignKey: 'style_id', targetKey: 'style_id' });
BeautyPrice.belongsTo(BeautyWeight, { foreignKey: 'weight_id', targetKey: 'weight_id' });

module.exports = BeautyPrice;