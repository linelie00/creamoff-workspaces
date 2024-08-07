//const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = require('.').sequelize;
const PetSpecies = require('../../models/PetSpecies');
const PetBreeds = require('../../models/PetBreed');
const PetDetailInfo = require('../../models/PetDetailInfo');
const PetSpeciesInfoRS = require('../../models/PetSpeciesInfoRS');
const PetDetailInfoStatus = require('../../models/PetDetailInfoStatus');
const Pet = require('../../models/Pet');

// 모든 species를 가져오는 함수
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

// 사용자가 입력한 species를 바탕으로 인덱스 값을 가져오는 함수
const getSpeciesIdByName = async (speciesName) => {
    try {
        const speciesRecord = await PetSpecies.findOne({
            where: { species: speciesName },
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

// 특정 species에 포함된 모든 breed를 가져오는 함수 
const getAllPetBreeds = async (speciesName) => {
    try {
        const speciesId = await getSpeciesIdByName(speciesName);
        const petBreeds = await PetBreeds.findAll({
            attributes: ['breed'],
            where: { pet_species: speciesId}
        });
        return petBreeds.map(breed => breed.breed);
    } catch (error) {
        throw new Error(`Failed to fetch pet breeds: ${error.message}`);
    }
};

// 특정 species에 따른 특이사항 목록을 가져오는 함수
 const getPetDetailsBySpecies = async (speciesName) => {
    try {
        const speciesId = await getSpeciesIdByName(speciesName);
        const details = await PetDetailInfo.findAll({
            attributes: ['id', 'information'],
            include: [{
                model: PetSpeciesInfoRS,
                where: { species_id: speciesId },
                attributes: []
            }]
        });
        return details.map(detail => ({ id: detail.id, information: detail.information }));
    } catch (error) {
        throw new Error(`Failed to fetch pet detail informations: &{error.message}`);
    }
 };

 // 펫 등록 함수
 const registerPet = async (petData) => {
    const { name, species, breed, birthDate, weight, gender, haveEtc, contents, details } = petData;
    try {
        const speciesId = await getSpeciesIdByName(species);
        const breedRecord = await PetBreeds.findOne({ where: {breed} });
        if (!breedRecord) {
            throw new Error(`Breed not found: ${breed}`);
        }
        const pet = await Pet.create({
            pet_name: name,
            pet_species: speciesId,
            pet_breed: breedRecord.id,
            pet_birth: birthDate,
            pet_weight: weight,
            pet_gender: gender === '남자',
            have_etc: haveEtc,
            contents: contents
        });
        const availableDetails = await PetSpeciesInfoRS.findAll({
            where: { species_id: speciesId },
            attributes: ['information_id']
        });
        const availableDetailIds = availableDetails.map(detail => detail.information_id);
        for (const detail of details) {
            if (availableDetailIds.includes(detail.id)) {
                await PetDetailInfoStatus.create({
                    pet_id: pet.pet_id,
                    species_information: detail.id,
                    whether: detail.value
                });
            }
        }
        return pet;
    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
 };

module.exports = {
    getAllPetSpecies,
    getSpeciesIdByName,
    getAllPetBreeds,
    getPetDetailsBySpecies,
    registerPet
};