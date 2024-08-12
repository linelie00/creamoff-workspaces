const express = require('express');
const petController = require('../controllers/petController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//router.use('/pet', petController);
router.get('/pet-species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/breeds', petController.getAllPetBreedsHandler);
router.get('/pet-details', petController.getPetDetailsBySpeciesHandler);
router.get ('/pet-options', petController.getPetOptionsHandler);
router.post('/register-pet', authMiddleware, petController.registerPetHandler);

module.exports = router;