const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/jwt.js');

module.exports = {
    login(req,res){
        console.log('login called');
        passport.authenticate('local', {session: false}, (err, user, info) =>{
            if(err || !user){
                res.status(400);
                console.log(err);
                console.log(user);
                return res.json({Message: info.Message});
            }else{
                req.login(user, {session:false}, (err) =>{
                    if(err){
                        res.status(400);
                        console.log(err);
                    }else{
                        console.log('singing');
                        jwt.sign({username: user}, key.getKey(), {expiresIn: "1d"} ,function(err,token){
                            res.status(200);
                            return res.json({token});
                        })
                    }
                });
            }
        })(req,res)
    },

    getUser(req,res,next){
        const username = req.user.username;

        user.findOne({username: username})
        .populate('characters')
        .then((result) =>{
            if(!result){
                res.status(400);
                res.send({Message: 'user not found'});
            }else{
                res.status(200);
                res.send(result);
            }
        }).catch(next);
    },

    createUser(req,res,next){
        const username = req.body.username;
        const password = req.body.password;

        console.log(req.body);

        User.findOne({username: username})
        .then((result) =>{
            if(result === null){
                var user = new User({username: username, password: password});

                user.save()
                .then(() =>{
                    res.status(200);
                    res.send({Message: 'user created'});
                })
            }else{
                res.status(422);
                res.send({Message: 'username is taken'});
            }
        })
    },

    deleteUser(req,res,next){
        const username = req.user.username;
        const password = req.body.password;

        console.log(username + ' username from delete');
        User.findOne({username: username})
        .then((result) =>{
            if(result !== null){
                if(result.comparePassword(password)){
                    result.remove();
                    res.status(200);
                    res.send({Message: 'user deleted'});
                }else{
                    res.status(400);
                    res.send({Message: 'Username or password did not match'});
                }
            }else{
                res.status(400);
                res.send({Message: 'Username or password did not match'});
            }
        }).catch(next); 
    }
}