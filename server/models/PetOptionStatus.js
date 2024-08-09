const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;
const Pet = require('./Pet');
const PetOptions = require('./PetOption');

const PetDetailInfoStatus = sequelize.define('TB_PET_OPTION_STATUS', {
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
    option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PET_OPTIONS',
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
PetDetailInfoStatus.belongsTo(PetOptions, { foreignKey: 'option_id', targetKey: 'id' });

module.exports = PetDetailInfoStatus;