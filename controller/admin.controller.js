const express = require('express');
const adminSchema = require('../model/admin.model');
const userSchema = require('../model/user.model');
const productSchema = require('../model/product.model');
const adminjwt =require('jsonwebtoken');


// admin login


exports.login = async(req,res)=>{


    const{adminemail,adminpassword} = req.body
    console.log(req.body,"sjhgduj");
    var da=await adminSchema.findOne({})
    console.log(da,"OOOO");
    var data = await adminSchema.findOne({adminemail});
    console.log(data,);

    if(data == null){
        res.json({message:"admin email not found"});
    }
    else{

        if(data.adminpassword == adminpassword){
            console.log(data);

            var token = await adminjwt.sign({id:data._id},process.env.key);
            res.cookie('adminjwt',token,{ expires: new Date(Date.now()+24*60*60*1000)});
            console.log(token);
            res.json({message:"admin login successful",token});
        }
        else{
            res.json({message:"admin login failed"});
        }
    }
}


// all user shows


exports.showuser = async(req,res)=>{
    try {
        var data = await userSchema.find({})
        res.json(data)
    } catch (err) {
        console.log(err);
    }
}


// all product

exports.allproduct = async(req,res)=>{
    try {
        var data = await productSchema.find({})
        res.json(data)
    } catch (err) {
        console.log(err);
    }
}
