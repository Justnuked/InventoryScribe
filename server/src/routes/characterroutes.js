const express = require('express');
const characterController = require('../controllers/charactercontroller');
const routes = express.Router();

//get all characters
routes.get('/', characterController.getAllCharactersOfUSer)

//get character
routes.get('/:id', characterController.getCharacter)

//post new character
routes.post('/', characterController.createCharacter)

//update character
routes.put('/:id', characterController.updateCharacter)

//delete character
routes.delete('/:id', characterController.deleteCharacter)

module.exports = routes;