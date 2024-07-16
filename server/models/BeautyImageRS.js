const { Sequelize, DataTypes } = require('sequelize');
const Beauty = require('./Beauty');
const BeautyImage = require('./BeautyImage');
const sequelize = require('../models').sequelize;

const BeautyImageRS = sequelize.define('TB_BEAUTY_IMAGE_RS', {
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
    image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_BEAUTY_IMAGES',
            key: 'image_id',
        },
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의
BeautyImageRS.belongsTo(Beauty, { foreignKey: 'beauty_id', targetKey: 'beauty_id' });
BeautyImageRS.belongsTo(BeautyImage, { foreignKey: 'image_id', targetKey: 'image_id' });

module.exports = BeautyImageRS;