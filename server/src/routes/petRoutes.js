const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

router.get('/pet-species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/breeds', petController.getAllPetBreedsHandler);

module.exports = router;