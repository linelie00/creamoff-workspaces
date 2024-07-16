const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;
const PetSpecies = require('./PetSpecies');
const PetDetailInfo = require('./PetDetailInfo');

const PetSpeciesInfoRS = sequelize.define('TB_PET_SPECIES_INFO_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    species_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PET_SPECIES',
            key: 'id',
        },
    },
    information_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PET_DETAIL_INFOS',
            key: 'id',
        },
    },
}, {
    timestamps: false,
});

// 외래 키 관계 설정
PetSpeciesInfoRS.belongsTo(PetSpecies, { foreignKey: 'species_id', targetKey: 'id' });
PetSpeciesInfoRS.belongsTo(PetDetailInfo, { foreignKey: 'information_id', targetKey: 'id' });

module.exports = PetSpeciesInfoRS;