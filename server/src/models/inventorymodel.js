const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InventorySchema = new Schema ({
    type:{
        type:String,
        required:true,
        },
    items:[{
        type:Schema.Types.ObjectId,
        ref:'item'
    }]
});

InventorySchema.pre('remove', function(next){
    const items = mongoose.model('item');

    items.remove({_id: {$in: this.items}}).then
    (() =>{
        next();
    });
});


const Inventory = mongoose.model('inventory', InventorySchema);

module.exports = Inventory;