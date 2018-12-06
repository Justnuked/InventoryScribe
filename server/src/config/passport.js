const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
const User = require('../models/usermodel');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const key = require('./jwt.js');

passport.use(new LocalStrat({
    usernameField : 'username',
    passwordField: 'password'
},
    function(username, password, cb){
        User.findOne({username: username})
        .then((result)=>{
            if(!result || result.comparePassword(password) === false){
                return cb(null, false, {Message: 'Incorrect credentials'});
            }else{
                return cb(null, result.username);
            }
        }).catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : key.getKey()
},
function (jwtPayload, cb) {

    return User.findOne({username: jwtPayload.username})
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));