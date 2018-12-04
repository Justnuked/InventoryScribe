const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema ({
    name:{
        type:String,
        required:true,
        },
    description:{
        type:String,
        required:true
    },
    weight:{
        type:number,
        required:true
    }
});


const Item = mongoose.model('item', ItemSchema);

module.exports = Item;