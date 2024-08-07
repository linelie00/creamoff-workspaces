const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getAllPetSpecies } = require('../services/petService');

// 모든 펫 품종 가져오기
=======
const { 
    getAllPetSpecies, 
    getSpeciesIdByName, 
    getAllPetBreeds,
    getPetDetailsBySpecies,
    registerPet
} = require('../services/petService');

// 모든 species 가져오기
>>>>>>> e28fafaac610ae8109394cd57087c21a01428bdd
const getAllPetSpeciesHandler = async (req, res) => {
    try {
        const species = await getAllPetSpecies();
        res.json(species);
    } catch (error) {
        console.error('Failed to fetch pet species error: ', error);
        res.status(500).json({message: 'Failed to fetch pet species.'});
    }
};

<<<<<<< HEAD
router.get('/pet-species', getAllPetSpeciesHandler);
router.get('/auto-complete/species', getAllPetSpeciesHandler);

module.exports = router;
=======
// 특정 species에 따른 모든 breed 가져오기
const getAllPetBreedsHandler = async (req, res) => {
    const speciesName = req.query.species;
    try {
        const breeds = await getAllPetBreeds(speciesName);
        res.json(breeds);
    } catch (error) {
        console.error('Failed to fetch pet breeds error: ', error);
        res.status(500).json({message: `Failed to fetch breeds for species: ${speciesName}.`});
    }
};

// 특정 species에 따른 특이사항 목록 가져오기
const getPetDetailsBySpeciesHandler = async (req, res) => {
    const speciesName = req.query.species;
    try {
        const details = await getPetDetailsBySpecies(speciesName);
        res.json(details);
    } catch (error) {
        console.error('Failed to fetch pet detail informations error: ', error);
        res.status(500).json({ message: `Failed to fetch details for species: ${speciesName}.` });
    }
};

// 펫 등록하기
const registerPetHandler = async (req, res) => {
    const petData = req.body;
    try {
        const pet = await registerPet(petData);
        res.status(201).json(pet);
    } catch (error) {
        console.error('Failed to register pet error: ', error);
        res.status(500).json({ message: 'Failed to register pet.'});
    }
};

module.exports = {
    getAllPetSpeciesHandler,
    getAllPetBreedsHandler,
    getPetDetailsBySpeciesHandler,
    registerPetHandler
};
>>>>>>> e28fafaac610ae8109394cd57087c21a01428bdd
