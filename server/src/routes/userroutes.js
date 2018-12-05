const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usercontroller');


routes.post('/login', userController.login);


//get user?
routes.get('/:id', function(){

})

routes.get('/', function(req,res){

    res.statusCode = 200;
    return res.json({eyyy : 'eeyyy'});
})

//post new user
routes.post('/', userController.createUser)

//update user
routes.put('/:id', function(){

})

//delete user
routes.delete('/:id', userController.deleteUser)

module.exports = routes;