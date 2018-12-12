const CharacterModel = require('../models/charactermodel');
const UserHelper = require('./helper');

module.exports = {

    createCharacter(req,res,next){
        const username = req.user.username;
        var name = req.body.name;
        var race = req.body.race;
        var charClass = req.body.class;

        UserHelper.getUser(username)
        .then((result) =>{
            if(result !== null){
                if(name && race && charClass){
                    var character = new CharacterModel({name : name, race : race, class : charClass});
                    character.save();
                    result.characters.push(character);
                    result.save();
    
                    res.status(200);
                    res.send({Message: 'Character created'});
                }else{
                    res.status(400);
                    res.send({Message: 'missing values'})
                }

            }else{
                res.status(400);
                res.send({Message: 'username not found'});
            }
        }).catch(next);
    },

    getAllCharactersOfUSer(req,res,next){
        const username = req.user.username;

        UserHelper.getUser(username)
        .then((userResult) =>{
            if(userResult === null){
                res.status(400);
                res.send({Message: 'User not found'});
            }else{
                res.status(200);
                res.send(userResult.characters);
            }
        }).catch(next);
    },

    getCharacter(req,res,next){
        CharacterModel.findById({_id: req.params.id})
        .populate('inventories')
        .populate('items')
        .then((result) =>{
            if(result === null){
                res.status(400);
                res.send({Message: 'Character not found'});
            }else{
                res.status(200);
                res.send(result);
            }
        }).catch(next);
    },

    updateCharacter(req,res,next){
        const username = req.user.username;
        const charId = req.params.id;
        var exists = false;

        UserHelper.getUser(username)
        .then((userResult) =>{
            if(userResult === null){
                res.status(400);
                res.send({Message: 'username not found'});
             }

            userResult.characters.forEach(element => {
             if(element._id.toString() === charId.toString()){
                    //character belongs to current user
                    exists = true;
                    CharacterModel.findByIdAndUpdate(charId, {name: req.body.name, race: req.body.race, class:req.body.class})
                    .then((result) =>{
                        if(result === null){
                            res.status(400);
                            res.send({Message: 'Character not found'});
                        }else{
                            res.status(200);
                            res.send({Message: 'Character updated'});
                        }
                    }).catch(next);
                }
            });
            if(!exists){
                //character doesnt belong to this user
                res.status(401);
                res.send({Message: 'This resource does not belong to user.'});
            }
        })
    },

    deleteCharacter(req,res,next){
        const username = req.user.username;
        const charId = req.params.id;
        var exists = false;

        console.log('deleting. . .');

        UserHelper.getUser(username)
        .then((userResult) =>{
            if(userResult === null){
                res.status(400);
                res.send({Message: 'username not found'});
            }else{
                userResult.characters.forEach(element =>{
                    if(element._id.toString() === charId.toString()){
                        exists = true;
                        CharacterModel.findByIdAndRemove(charId)
                        .then((result) =>{
                            if(result === null){
                                res.status(400);
                                res.send({Message: 'Character not found'});
                            }else{
                                userResult.characters.pull(charId);
                                userResult.save();

                                res.status(200);
                                res.send({Message: 'Character deleted'});
                            }
                        }).catch(next);
                    }
                });
                if(!exists){
                    res.status(401);
                    res.send({Message: 'This resource does not belong to user'});
                }
            }
        })
    }
}