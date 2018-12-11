const User = require('../models/usermodel');
const Inventory = require('../models/inventorymodel');
const Character = require('../models/charactermodel');


async function getUser(username){
   var temp = await User.findOne({username: username})
   .populate('characters');

   if(!temp){
       return null;
   }else{
       return temp;
   }
}

async function getCharacter(userId){
    var temp = await Character.findById(userId).populate('inventories').populate('items');
 
    if(!temp){
        return null;
    }else{
        return temp;
    }
 }


async function getInventory(inventoryId){
    var temp = await Inventory.findById(inventoryId).populate('item');
 
    if(!temp){
        return null;
    }else{
        return temp;
    }
 }

module.exports.getUser = getUser;
module.exports.getInventory = getInventory;
module.exports.getCharacter = getCharacter;