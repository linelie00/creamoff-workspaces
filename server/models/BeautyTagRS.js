const { Sequelize, DataTypes } = require('sequelize');
const Beauty = require('./Beauty');
const BeautyTag = require('./BeautyTag');
const sequelize = require('../models').sequelize;

const BeautyTagRS = sequelize.define('TB_BEAUTY_TAG_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    beauty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_BEAUTIES',
            key: 'beauty_id',
        },
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_BEAUTY_TAGS',
            key: 'tag_id',
        },
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의
BeautyTagRS.belongsTo(Beauty, { foreignKey: 'beauty_id', targetKey: 'beauty_id' });
BeautyTagRS.belongsTo(BeautyTag, { foreignKey: 'tag_id', targetKey: 'tag_id' });

module.exports = BeautyTagRS;