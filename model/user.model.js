const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username:{
        type:String
    },
    useremail:{
        type:String
    },
    userpassword:{
        type:String
    },
    img:{
        type:String
    },
    img_id:{
        type:String
    }


});


module.exports=mongoose.model('User',userSchema);