const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CharacterSchema = new Schema ({
    name:{
        type:String,
        required:true
        },
    race:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    inventories:[{
        type:Schema.Types.ObjectId,
        ref:'inventory'
    }]
});


const Character = mongoose.model('character', CharacterSchema);

module.exports = Character;