// models/BeautyTagRS.js

const { DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Business = require('./Business');
const BeautyTag = require('./BeautyTag');

const BeautyTagRS = sequelize.define('TB_BEAUTY_TAG_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    business_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: Business,
            key: 'id',
        },
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BeautyTag,
            key: 'tag_id',
        },
    },
}, {
    tableName: 'TB_BEAUTY_TAG_RS', // 테이블 이름 확인
    timestamps: false,
});

// 외래 키 관계 정의
BeautyTagRS.belongsTo(Business, { foreignKey: 'business_id' });
BeautyTagRS.belongsTo(BeautyTag, { foreignKey: 'tag_id' });

module.exports = BeautyTagRS;