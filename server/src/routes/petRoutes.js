const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

//router.use('/pet', petController);
router.get('/pet-species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/breeds', petController.getAllPetBreedsHandler);
router.get('/pet-details', petController.getPetDetailsBySpeciesHandler);
router.post('/register-pet', petController.registerPetHandler);

module.exports = router;