const userjwt = require('jsonwebtoken');
const user = require('../model/user.model');

const user_token = async(req,res,next)=>{

    var toten = req.headers.authorization

    if(toten){
        console.log("token success");
        var userSchema = await userjwt.verify(toten,process.env.key,(err,data)=>{

            if(err){
                console.log(err);
            }
            return data
        })

        if(userSchema == undefined){
            res.json({message:"token in valid"});
        }
        else{
            var data= await user.findById(userSchema.id)

            if(data==null){
                res.json({message:"data not found"});
                console.log(data,userdata);
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


module.exports=user_token;