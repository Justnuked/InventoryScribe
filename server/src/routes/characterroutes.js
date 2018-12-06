const express = require('express');
const characterController = require('../controllers/charactercontroller');
const routes = express.Router();

//get all characters
routes.get('/', function(){

})

//get character
routes.get('/:id', function(){

})

//post new character
routes.post('/', characterController.createCharacter)

//update character
routes.put('/:id', characterController.updateCharacter)

//delete character
routes.delete('/:id', function(){

})

module.exports = routes;