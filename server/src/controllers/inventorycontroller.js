const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/jwt.js');
const Inventory = require('../models/inventorymodel');
const Helper = require('./helper');

module.exports = {
    getInventory(req,res,next){
        var id = req.params.id;

        Helper.getInventory(id)
        .then((result) =>{
            if(result){
                res.status(200);
                res.send(result);
            }else{
                res.status(400);
                res.status({Message: 'Inventory not found'});
            }
        })
    },

    GetAllInventoriesByCharacter(req,res,next){
        var charId = req.params.id;

        Helper.getCharacter(charId)
        .then((result) =>{
            if(result){
                res.status(200);
                res.send(result.inventories);
            }else{
                res.status(400);
                res.status({Message: 'character not found'});
            }
        })
    },

    updateInventory(req,res,next){
        var inventoryId = req.params.id;
        var charId = req.body.charid;
        var type = req.body.type;
        var exists = false;

        Helper.getUser(req.user.username)
        .then((userResult) =>{
            if(!userResult){
                res.status(400);
                res.send({Message: 'Username not found'});
            }else{
                Helper.getCharacter(charId)
                .then((resultCharacter) =>{
                    if(!resultCharacter){
                        res.status(400);
                        res.send({Message: 'Character not found'});
                    }else{
                        userResult.characters.forEach(element => {
                            if(element._id.toString() === charId.toString()){
                                //character belongs to user
                                exists = true;
                                Inventory.findByIdAndUpdate(inventoryId, {type: type})
                                .then((result) =>{
                                    if(result){
                                        result.save();
                                        res.status(200);
                                        res.send({Message: 'Inventory updated'});
                                    }else{
                                        res.status(400);
                                        res.send({Message:'Inventory not found'})
                                    }
                                });
                            }
                        });

                        if(!exists){
                            res.status(401);
                            res.send({Message: 'This resource doesnt belong to this user'});
                        }
                    }
                })
            }
        })
    },

    deleteInventory(req,res,next){
        var inventoryId = req.params.id;
        var charId = req.body.charid;
        var exists = false;

        Helper.getUser(req.user.username)
        .then((userResult) =>{
            if(!userResult){
                res.status(400);
                res.send({Message: 'Username not found'});
            }else{
                Helper.getCharacter(charId)
                .then((resultCharacter) =>{
                    if(!resultCharacter){
                        res.status(400);
                        res.send({Message: 'Character not found'});
                    }else{
                        userResult.characters.forEach(element => {
                            if(element._id.toString() === charId.toString()){
                                //character belongs to user
                                exists = true;
                                Inventory.findByIdAndRemove(inventoryId)
                                .then((result) =>{
                                    if(result){
                                        result.save();

                                        resultCharacter.inventories.pull(inventoryId);
                                        resultCharacter.save();
                                        res.status(200);
                                        res.send({Message: 'Inventory deleted'});
                                    }else{
                                        res.status(400);
                                        res.send({Message:'Inventory not found'})
                                    }
                                });
                            }
                        });

                        if(!exists){
                            res.status(401);
                            res.send({Message: 'This resource doesnt belong to this user'});
                        }
                    }
                })
            }
        })
    },

    createInventory(req,res,next){
        var type = req.body.type;
        var maxCapacity = req.body.maxcapacity;
        var charId = req.body.charid;
        var exists = false;

        Helper.getUser(req.user.username)
        .then((userResult) =>{
            if(!userResult){
                res.status(400);
                res.send({Message: 'Username not found'});
            }else{
                Helper.getCharacter(charId)
                .then((result) =>{
                    if(!result){
                        res.status(400);
                        res.send({Message: 'Character not found'});
                    }else{
                        userResult.characters.forEach(element => {
                            if(element._id.toString() === charId.toString()){
                                //character belongs to user
                                exists = true;

                                if(type){
                                    var temp = new Inventory({type: type});
                                    temp.save();
                                    result.inventories.push(temp);
                                    result.save();
    
                                    res.status(200);
                                    res.send({Message: 'Inventory added'});
                                }else{
                                    res.status(400);
                                    res.send({Message: 'Missing values'});
                                }
                            }
                        });

                        if(!exists){
                            res.status(401);
                            res.send({Message: 'This resource doesnt belong to this user'});
                        }
                    }
                })
            }
        })
    },
}