const express = require('express');
const admin_token = require('../middleware/admin.middlewere');
const upload = require('../cloud/multer');
const router = express.Router();


const{
    login,
    showuser,
    allproduct

}=require('../controller/admin.controller');




router.post('/login',login);
router.get('/showalluser',admin_token,showuser)
router.get('/allproduct',admin_token,allproduct)




module.exports = router;