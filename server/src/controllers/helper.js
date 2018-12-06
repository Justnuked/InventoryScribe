const User = require('../models/usermodel');


async function getUser(username){
   var temp = await User.findOne({username: username}).populate('characters');

   if(!temp){
       return null;
   }else{
       return temp;
   }
}

module.exports.getUser = getUser;