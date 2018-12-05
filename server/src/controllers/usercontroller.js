const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/jwt.js');

module.exports = {
    login(req,res){
        passport.authenticate('local', {session: false}, (err, user, info) =>{
            if(err || !user){
                res.status(400);
                return res.json(info.Message);
            }else{
                req.login(user, {session:false}, (err) =>{
                    console.log('trying to login. . .');
                    if(err){
                        res.status(400);
                        console.log(err);
                    }else{
                        jwt.sign({username: user}, key.getKey(), {expiresIn: "1d"} ,function(err,token){
                            res.status(200);
                            return res.json({token});
                        })
                    }
                });
            }
        })(req,res)
    },

    createUser(req,res,next){
        const username = req.body.username;
        const password = req.body.password;

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
                res.status(409);
                res.send({Message: 'username is taken'});
            }
        })
    },

    deleteUser(req,res,next){
        const id = req.params.id;
        const password = req.body.password;

        User.findById(id)
        .then((result) =>{
            if(result !== null){
                if(result.password === password){
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