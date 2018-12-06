const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InventorySchema = new Schema ({
    type:{
        type:String,
        required:true,
        },
    maxcarrycapacity:{
        type:number,
        required:true
    },
    currentcapacity:{
        type:String,
    },
    items:[{
        type:Schema.Types.ObjectId,
        ref:'item'
    }]
});


const Inventory = mongoose.model('inventory', InventorySchema);

module.exports = Inventory;