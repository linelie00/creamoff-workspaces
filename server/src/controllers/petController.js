const express = require('express');
const router = express.Router();
const { getAllPetSpecies, getSpeciesIdByName, getAllPetBreeds } = require('../services/petService');

// 모든 펫 품종 가져오기
const getAllPetSpeciesHandler = async (req, res) => {
    try {
        const species = await getAllPetSpecies();
        res.json(species);
    } catch (error) {
        console.error('Failed to fetch pet species error: ', error);
        res.status(500).json({message: 'Failed to fetch pet species.'});
    }
};

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

module.exports = {
    getAllPetSpeciesHandler,
    getAllPetBreedsHandler,
};