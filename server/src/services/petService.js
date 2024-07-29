const { Sequelize } = require('sequelize');
const PetSpecies = require('../../models/PetSpecies'); // PetSpecies 모델 임포트
const PetBreeds = require('../../models/PetBreed');

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

const getSpeciesIdByName = async (speciesName) => {
    try {
        const speciesRecord = await PetSpecies.findOne({
            where: {
                species: speciesName
            },
            attributes: ['id']
        });
        if (!speciesRecord) {
            throw new Error(`Species not found: ${speciesName}`);
        }
        return speciesRecord.id;
    } catch (error) {
        throw new Error(`Failed to fetch species ID: ${error.message}`);
    }
};

const getAllPetBreeds = async (speciesName) => {
    try {
        const speciesId = await getSpeciesIdByName(speciesName);
        const petBreeds = await PetBreeds.findAll({
            attributes: ['breed'],
            where: {
                pet_species: speciesId
            }
        });
        return petBreeds.map(breed => breed.breed);
    } catch (error) {
        throw new Error(`Failed to fetch pet breeds: ${error.message}`);
    }
};

module.exports = {
    getAllPetSpecies,
    getSpeciesIdByName,
    getAllPetBreeds
};