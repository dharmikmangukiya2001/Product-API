const adminjwt = require('jsonwebtoken');
const adminSchema = require('../model/admin.model');

const admin_token = async(req,res,next)=>{

    var toten = req.headers.authorization

    if(toten){
        console.log("token success");
        var admindata = await adminjwt.verify(toten,process.env.key,(err,data)=>{

            if(err){
                console.log(err);
            }
            return data
        })

        if(admindata == undefined){
            res.json({message:"token in valid"});
        }
        else{
            
            var data= await adminSchema.findById(admindata.id)
            console.log(data,"ddddddddd");
            if(data==null){
                res.json({message:"data not found"});
            }
            else{
                next();
            }
        }
    }
    else{
        res.json({message:"login require"})
    }

}


module.exports=admin_token;