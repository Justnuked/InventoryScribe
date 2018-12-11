const express = require('express');
const routes = express.Router();
const inventoryContoller = require('../controllers/inventorycontroller');

//get all inventories
routes.get('/character/:id', inventoryContoller.GetAllInventoriesByCharacter)

//get one inventory
routes.get('/:id', inventoryContoller.getInventory)

//post new inventory
routes.post('/', inventoryContoller.createInventory)

//update inventory
routes.put('/:id', inventoryContoller.updateInventory)

//delete inventory
routes.delete('/:id', inventoryContoller.deleteInventory)

module.exports = routes;