//const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = require('.').sequelize;
const PetSpecies = require('../../models/PetSpecies');
const PetBreeds = require('../../models/PetBreed');
const Pet = require('../../models/Pet');
const PetOptions = require('../../models/PetOption');
const PetOptionRS = require('../../models/PetOptionRS');
const PetOptionStatus = require('../../models/PetOptionStatus');
const { at } = require('lodash');
const imageService = require('../services/imgService');

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
            attributes: ['id','breed']
        });
        return petBreeds.map(breed => ({
            id: breed.id,
            breed: breed.breed
        }));
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
    try {
        // 생일 파싱 - YY/MM/DD 형식으로 가정
        const [year, month, day] = petData.birthDate.split('/');
        const parsedYear = parseInt(year, 10) < 50 ? `20${year}` : `19${year}`; // 50년 이전은 2000년대, 이후는 1900년대
        const birthDate = new Date(`${parsedYear}-${month}-${day}`);
        console.log('Parsed birth date:', birthDate);

        const pet = await Pet.create({
            platform_id: petData.platform_id,
            platform: petData.platform,
            pet_name: petData.name,
            pet_species: petData.species,
            pet_breed: petData.breed,
            pet_birth: birthDate.toISOString().split('T')[0], // 날짜 형식 변환
            pet_weight: petData.weight,
            pet_gender: petData.gender,
            pet_etc: petData.etc,
        });

        const petId = pet.pet_id;

        // 이미지 처리
        let petImg = null;
        if (petData.image) {
            petImg = await imageService.uploadPetImage(petData.image, petId, 'pet');
        }

        // 펫 상세 정보 데이터베이스에 저장
        const petDetails = petData.details.map(detail => ({
            pet_id: petId,
            option_id: detail.id,
            whether: detail.value === 1,
        }));

        await PetOptionStatus.bulkCreate(petDetails);

        return { pet, petImg, petDetails };
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