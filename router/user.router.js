const express = require('express');
const user_token = require('../middleware/user.middlewere');
const upload = require('../cloud/multer');
const router = express.Router();


const{
    register,
    login,
    addproduct,
    showproduct,
    deleteproduct,
    updateproduct,
    productfilter,
    pricefilter

}=require('../controller/user.controller');



router.post('/register',register);
router.post('/login',login);
router.post('/addproduct',user_token,upload.array('productimg'),addproduct);
router.get('/showproduct',user_token,showproduct);
router.get('/deleteproduct/:id',user_token,deleteproduct);
router.put('/updateproduct/:id',user_token,upload.array('productimg'),updateproduct);
router.get('/productfilter/:productname',user_token,productfilter);
router.get('/pricefilter/:min/:max',user_token,pricefilter);




module.exports = router;