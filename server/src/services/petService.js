const { Sequelize } = require('sequelize');
const PetSpecies = require('../../models/PetSpecies'); // PetSpecies 모델 임포트

const getAllPetSpecies = async () => {
    try {
        const petSpecies = await PetSpecies.findAll({
            attributes: ['species'] // species 필드만 선택
        });
        return petSpecies.map(species => species.species);
    } catch (error) {
        throw new Error(`Failed to fetch pet species: ${error.message}`);
    }
};

module.exports = {
    getAllPetSpecies,
};