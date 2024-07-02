const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Pet = require('./Pet');
const PetDetailInfo = require('./PetDetailInfo');

const PetDetailInfoStatus = sequelize.define('TB_PET_DETAIL_INFO_STATUS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PETS',
            key: 'pet_id',
        },
    },
    species_information: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PET_DETAIL_INFOS',
            key: 'id',
        },
    },
    whether: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

PetDetailInfoStatus.belongsTo(Pet, { foreignKey: 'pet_id', targetKey: 'pet_id' });
PetDetailInfoStatus.belongsTo(PetDetailInfo, { foreignKey: 'species_information', targetKey: 'id' });

module.exports = PetDetailInfoStatus;