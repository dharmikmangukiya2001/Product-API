const mongoose = require('mongoose');
const { array } = require('../cloud/multer');
const productSchema = new mongoose.Schema({

    productname:{
        type:String
    },
    productprice:{
        type:String
    },
    productdetails:{
        type:String
    },
    product_user_id:{
        type:String
    },
    productimg:{
        type:Array
    },
    productimg_id:{
        type:Array
    }


});


module.exports=mongoose.model('Product',productSchema);