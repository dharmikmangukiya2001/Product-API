const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({

    adminemail:{
        type:String
    },
    adminpassword:{
        type:String
    }


});


module.exports=mongoose.model('admin',adminSchema);