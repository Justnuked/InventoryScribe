const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/jwt.js');
const Item = require('../models/itemmodel');
const Inventory = require('../models/inventorymodel');
const Helper = require('./helper');

module.exports = {

    getItemPerInventory(req,res,next){
        Inventory.findById(req.params.id)
        .populate('items')
        .then((result) =>{
            if(result){
                res.status(200);
                res.send(result.items);
            }else{
                res.status(400);
                res.send({Message: 'Inventory not found'});
            }
        })
    },

    getItem(req,res,next){
        var itemId = req.params.id;

        Item.findById(itemId)
        .then((result) =>{
            res.status(200);
            res.send(result);
        });
    },

    updateItem(req,res,next){
        var charId = req.body.charid;
        var inventoryid = req.body.inventoryid;
        var itemid = req.params.id;
        var newName = req.body.name;
        var newDescription = req.body.description;
        var newAmount = req.body.amount;
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
                                Inventory.findById(inventoryid)
                                .then((invResult) =>{
                                    if(invResult){
                                        Item.findByIdAndUpdate(itemid, {name: newName, description: newDescription, amount:newAmount})
                                        .then((result) =>{
                                            res.status(200);
                                            res.send({Message: 'Item updated'});
                                        })
                                    }else{
                                        res.status(400);
                                        res.send({Message: 'Inventory not found'});
                                    }
                                })
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

    deleteItem(req,res,next){
        var charId = req.body.charid;
        var inventoryid = req.body.inventoryid;
        var itemid = req.params.id;
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
                                Inventory.findById(inventoryid)
                                .then((invResult) =>{
                                    if(invResult){
                                        Item.findById(itemid)
                                        .then((result) =>{
                                            if(result.amount - 1 >= 1){
                                                Item.findByIdAndUpdate(itemid, {amount: (result.amount - 1)})
                                                .then((result) =>{
                                                    res.status(200);
                                                    res.send({Message: 'Item deleted'});
                                                })
                                            }else{
                                                Item.remove(result).then(() =>{
                                                    result.save();
                                                    invResult.items.pull(result);
                                                    invResult.save();
                                                    res.status(200);
                                                    res.send({Message: 'Item deleted'});
                                                })
                                            }
                                        })
                                    }else{
                                        res.status(400);
                                        res.send({Message: 'Inventory not found'});
                                    }
                                })
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

    postItem(req,res,next){
        var charId = req.body.charid;
        var itemname = req.body.name;
        var itemdescription = req.body.description;
        var amount = req.body.amount;
        var inventoryid = req.body.inventoryid;
        var exists = false;

        console.log(charId);
        console.log(itemname);
        console.log(itemdescription);
        console.log(amount);
        console.log(inventoryid);

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
                                if(itemname && itemdescription && amount){
                                    Inventory.findById(inventoryid)
                                    .then((invResult) =>{
                                        if(invResult){
                                            var temp = new Item({name: itemname, description: itemdescription, amount:amount});
                                            temp.save();
                                            invResult.items.push(temp);
                                            invResult.save();
                                            res.status(200);
                                            res.send({Message: 'Item added'});
                                        }else{
                                            res.status(400);
                                            res.send({Message: 'Inventory not found'});
                                        }
                                    })
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
    }
}