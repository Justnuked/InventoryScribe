const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usercontroller');

routes.post('/login', userController.login);
routes.post('/register', userController.createUser);

module.exports = routes;
