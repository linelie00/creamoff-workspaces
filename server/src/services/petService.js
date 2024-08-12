//const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = require('.').sequelize;
const PetSpecies = require('../../models/PetSpecies');
const PetBreeds = require('../../models/PetBreed');
const PetDetailInfo = require('../../models/PetOption');
const PetSpeciesInfoRS = require('../../models/PetOptionRS');
const PetDetailInfoStatus = require('../../models/PetOptionStatus');
const Pet = require('../../models/Pet');
const PetOptions = require('../../models/PetOption');
const PetOptionRS = require('../../models/PetOptionRS');
const { at } = require('lodash');

// 모든 species를 가져오는 함수
const getAllPetSpecies = async () => {
    try {
        const petSpecies = await PetSpecies.findAll({
            attributes: ['id', 'species'],
            raw: true  // raw: true를 사용하여 단순한 데이터 객체 배열을 반환받음
        });

        return petSpecies;  // pet_id와 species를 포함한 객체 배열을 그대로 반환
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
const getAllPetBreeds = async (speciesId) => {
    try {
        const petBreeds = await PetBreeds.findAll({
            where: { pet_species: speciesId},
            attributes: ['breed']
        });
        return petBreeds.map(breed => breed.breed);
    } catch (error) {
        throw new Error(`Failed to fetch pet breeds: ${error.message}`);
    }
};

// 특정 species에 따른 특이사항 목록을 가져오는 함수
const getPetOptionsBySpecies = async (species_id) => {
    try {
        // 첫 번째 쿼리: 해당 species_id에 대한 option_id를 가져옵니다.
        const OptionID = await PetOptionRS.findAll({
            where: { species_id },
            attributes: ['option_id'],
        });

        // 가져온 option_id 목록을 배열로 추출합니다.
        const optionIds = OptionID.map(option => option.option_id);

        // 두 번째 쿼리: 위에서 얻은 option_id 목록에 해당하는 옵션을 가져옵니다.
        const petOptions = await PetOptions.findAll({
            where: {
                id: optionIds,
            },
            attributes: ['id', 'option', 'true', 'false'],
        });

        // 가져온 옵션 데이터를 반환합니다.
        return petOptions.map(petOption => ({
            optionId: petOption.id,
            option: petOption.option,
            true: petOption.true,
            false: petOption.false,
        }));
    } catch (error) {
        throw new Error(`Failed to fetch pet options for species_id ${species_id}: ${error.message}`);
    }
};

 // 펫 등록 함수
 const registerPet = async (petData) => {
    const { name, species, breed, birthDate, weight, gender, haveEtc, contents, details } = petData;
    try {
        const pet = await Pet.create({
            pet_name: name,
            pet_species: species,
            pet_breed: breed,
            pet_birth: birthDate,
            pet_weight: weight,
            pet_gender: gender,
            have_etc: haveEtc,
            contents: contents
        });
        const availableDetails = await PetOptionRS.findAll({
            where: { species_id: speciesId },
            attributes: ['option_id']
        });
        const availableDetailIds = availableDetails.map(detail => detail.information_id);
        for (const detail of details) {
            if (availableDetailIds.includes(detail.id)) {
                await PetDetailInfoStatus.create({
                    pet_id: pet.pet_id,
                    option_id: detail.id,
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
    getPetOptionsBySpecies,
    registerPet
};