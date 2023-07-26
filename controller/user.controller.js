const express = require('express');
const userSchema = require('../model/user.model');
const productSchema = require('../model/product.model');
const cloudinary = require('../cloud/cloudinary');
const userjwt =require('jsonwebtoken');
const { Schema } = require('mongoose');



// user registration

exports.register=async(req,res)=>{

    try {
        
        const{username,useremail,userpassword}=req.body
        console.log(req.body);

        if(username==''||userpassword==''||useremail==''){
            res.json({message:"username,useremail,userpassword not found"});
        }
        else{

            var data = await userSchema.findOne({useremail});

            if(data == null){
                var user = await userSchema.create(req.body);
                if(user){
                    res.json({message:"user registered successfully"});
                }
            }
            else{
                res.json({message:"useremail already exists"});
            }
        }

    } catch (err) {
        console.log(err);        
    }


}


// user login


exports.login = async(req,res)=>{


    const{useremail,userpassword} = req.body
    console.log(req.body);

    var data = await userSchema.findOne({useremail});

    if(data == null){
        res.json({message:"useremail not found"});
    }
    else{

        if(data.userpassword == userpassword){
            console.log(data);

            var token = await userjwt.sign({id:data._id},process.env.key);
            res.cookie('userjwt',token,{ expires: new Date(Date.now()+24*60*60*1000)});
            console.log(token);
            res.json({message:"user login successful",token});
        }
        else{
            res.json({message:"user login failed"});
        }
    }
}


// add product 


exports.addproduct = async(req,res)=>{

    try {
        console.log(req.files);


    const{productname,productprice,productdetails,productimg}=req.body

    var decode = await userjwt.verify(req.headers.authorization,process.env.key);
    console.log(decode);


    if(productname==''|| productprice==''|| productdetails==''|| productimg==''){

        res.json({message:"files in missing"})

    }
    else{
        var files=req.files
        var product_img = []
        var productimg_id = []

        for(var file of files){
            var imgdata = await cloudinary.uploader.upload(file.path)
            product_img.push(imgdata.secure_url)
            productimg_id.push(imgdata.public_id)

        }
        var data = await productSchema.create({
            productname,
            productprice,
            productdetails,
            productimg,
            productimg_id,
            product_user_id:decode.id
        })
        if(data){
            res.json({message:"product add successfully"})
        }
        else{
            res.json({message:"product not added successfully"})
        }
    }
    } catch (err) {
        console.log(err);
    }

}


// show product


exports.showproduct = async(req,res)=>{

    try {
        
        var data = await productSchema.find()
        res.json(data)

    } catch (err) {
        console.log(err);
    }

}


// delete product

exports.deleteproduct = async(req,res)=>{
    try {
        
        var data = await productSchema.findById(req.params.id);

        for(var i=0; i<data.productimg_id.length; i++) {
            cloudinary.uploader.destroy(data.productimg_id[i],(err,result)=>{
                if(err) {
                    log.error(err);
                }
                else{
                    console.log(result);
                }
            });
        }

        var deletedata = await productSchema.findByIdAndDelete(req.params.id);
        console.log(deletedata);

        if(deletedata){
            res.json({message:"product delete successfully"})
        }
        else[
            res.json({message:"product not delete successfully"})
        ]

    } catch (err) {
        console.log(err);
    }
}


// update product


exports.updateproduct = async(req, res) => {

    try {
        if(req.files){
            var data = await productSchema.findById(req.params.id)
    
    
            for(var i=0; i<data.productimg_id.length; i++) {
                cloudinary.uploader.destroy(data.productimg_id[i],(err,result)=>{
                    if(err) {
                        log.error(err);
                    }
                    else{
                        console.log(result);
                    }
                });
            }
            var files=req.files
            var product_img = []
            var productimg_id = []
    
            for(var file of files){
                var imgdata = await cloudinary.uploader.upload(file.path)
                product_img.push(imgdata.secure_url)
                productimg_id.push(imgdata.public_id)
    
            }
            req.body.productimg= product_img
            req.body.productimg_id= productimg_id
    
            var update = await productSchema.findByIdAndUpdate(req.params.id,req.body)
    
            if(update){
                res.json({message:"product data update sueccfully"})
            }
            else{
                 res.json({message:"product data not update"})
    
            }
        }
        else{
            var update = await productSchema.findByIdAndUpdate(req.params.id,req.body)
    
            if(update){
                res.json({message:"product data update sueccfully"})
            }
            else{
                 res.json({message:"product data not update"})
    
            }
        }
    } catch (err) {
        console.log(err);
    }

}


// product filter name



exports.productfilter = async(req,res)=>{
    try {
        var data = await productSchema.find({productname:req.params.productname})
        res.json(data)
    } catch (err) {
        console.log(err);
    }
}


// price filter


exports.pricefilter = async(req,res)=>{
    try {
        var data = await productSchema.find({productprice:{$gte:req.params.min,$lte:req.params.max}})
        res.json(data)
    } catch (err) {
        console.log(err);
    }
}