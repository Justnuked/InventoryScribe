const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    characters:[{
        type:Schema.Types.ObjectId,
        ref:'character'
    }]
});


const User = mongoose.model('user', UserSchema);

module.exports = User;