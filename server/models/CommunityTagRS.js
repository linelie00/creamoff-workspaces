const { Sequelize, DataTypes } = require('sequelize');
const Community = require('./community');
const CommunityTag = require('./CommunityTag');
const sequelize = require('../models').sequelize;

const CommunityTagRS = sequelize.define('TB_COMMUNITY_TAG_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_COMMUNITIES',
            key: 'id',
        },
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_COMMUNITY_TAGS',
            key: 'tag_id',
        },
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의
CommunityTagRS.belongsTo(Community, { foreignKey: 'community_id', targetKey: 'id' });
CommunityTagRS.belongsTo(CommunityTag, { foreignKey: 'tag_id', targetKey: 'tag_id' });

module.exports = CommunityTagRS;