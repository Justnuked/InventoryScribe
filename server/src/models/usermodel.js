const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


const UserSchema = new Schema ({
    username:{
        type:String,
        required:true,
        unique:true
        },
    password:{
        type:String,
        required:true
    },
    datecreated:{
        type:Date
    },
    characters:[{
        type:Schema.Types.ObjectId,
        ref:'character'
    }],
});

UserSchema.pre('save', function(next){
    const temp = this.password;
    if(!this.datecreated){
        this.datecreated = Date.now();
        var hash = crypto.createHmac('sha256', 'secretsalt').update(temp).digest('hex');
        this.password = hash;
    }
    next();
});

UserSchema.pre('remove', function(next){
    const characters = mongoose.model('character');

    characters.remove({_id: {$in: this.characters}}).then
    (() =>{
        next();
    });
});

UserSchema.methods.comparePassword = function(password){
    var hash = crypto.createHmac('sha256', 'secretsalt').update(password).digest('hex');

    if(this.password === hash){
        return true;
    }else{
        return false;
    }
};

const User = mongoose.model('user', UserSchema);

module.exports = User;