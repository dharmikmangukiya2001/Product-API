const express = require('express');
const userSchema = require('../model/user.model')
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