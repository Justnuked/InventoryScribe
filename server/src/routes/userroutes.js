const express = require('express');
const routes = express.Router();
const userController = require('../controllers/usercontroller');

//get user?
routes.get('/:id', function(){

})

//get users?
routes.get('/', function(req,res){

    res.statusCode = 200;
    return res.json({eyyy : req.user.username});
})

//update user
routes.put('/:id', function(){

})

//delete user
routes.delete('/', userController.deleteUser)

module.exports = routes;