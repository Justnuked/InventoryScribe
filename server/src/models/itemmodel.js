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
    amount:{
        type:Number
    }
});


const Item = mongoose.model('item', ItemSchema);

module.exports = Item;