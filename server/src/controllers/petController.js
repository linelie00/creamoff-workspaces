const express = require('express');
const router = express.Router();
const { getAllPetSpecies } = require('../services/petService');

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

router.get('/pet-species', getAllPetSpeciesHandler);
router.get('/auto-complete/species', getAllPetSpeciesHandler);

module.exports = router;