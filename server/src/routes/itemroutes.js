const express = require('express');
const routes = express.Router();
const ItemController = require('../controllers/itemcontroller');

//get all items in a inventory
routes.get('/inventory/:id', ItemController.getItemPerInventory)

//post new item
routes.post('/', ItemController.postItem)

//get item
routes.get('/:id', ItemController.getItem)

//update item
routes.put('/:id', ItemController.updateItem);

//delete item
routes.delete('/:id', ItemController.deleteItem)

module.exports = routes;