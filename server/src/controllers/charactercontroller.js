const CharacterModel = require('../models/charactermodel');
const UserHelper = require('./helper');

module.exports = {

    createCharacter(req,res,next){
        const username = req.user.username;

        UserHelper.getUser(username)
        .then((result) =>{
            if(result !== null){
                var character = new CharacterModel({name : req.body.name, race : req.body.race, class : req.body.class});
                character.save();
                result.characters.push(character);
                result.save();

                res.status(200);
                res.send({Message: 'Character created'});
            }else{
                res.status(400);
                res.send({Message: 'username not found'});
            }
        }).catch(next);
    },

    updateCharacter(req,res,next){
        const username = req.user.username;
        const charId = req.params.id;

        UserHelper.getUser(username)
        .then((userResult) =>{
            console.log(userResult.characters + 'From userresult');

            userResult.characters.forEach(element => {
                if(element._id === charId){
                    console.log('dit werkt');
                }
            });

            //TODO check if charId sits in the list of this user else this user is updateing an char that is not his


            if(userResult === null){
                res.status(400);
                res.send({Message: 'username not found'});
            }else{
                CharacterModel.findByIdAndUpdate(charId, {name: req.body.newName, race: req.body.newRace, class:req.body.newClass})
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
        })
    },

    deleteCharacter(req,res,next){
        const username = req.user.username;
        const charId = req.params.id;

        UserHelper.getUser(username)
        .then((userResult) =>{
            if(userResult === null){
                res.status(400);
                res.send({Message: 'username not found'});
            }else{


                CharacterModel.findByIdAndRemove(charId)
                .then((result) =>{
                    if(result === null){
                        res.status(400);
                        res.send({Message: 'Character not found'});
                    }else{
                        res.status(200);
                        res.send({Message: 'Character deleted'});
                    }
                }).catch(next);
            }
        })
    }
}