const AppError = require("../utils/AppError")
const User=require('../models/user');
const jwt = require('jsonwebtoken');

exports.edit=async(req,res,next)=>{
        const updateData={};
        const user_id=req.body.user_id;
        if(!user_id)
            return next(new AppError("UserId is required", 400));
        console.log("req.body.username: "+req.body.username)
        if(req.body.username) updateData.username=req.body.username;
        if(req.file) 
            updateData.image=req.file.filename;
    try{
        const updatedUser=await User.findByIdAndUpdate(user_id, updateData, {new:true});
        if(!updatedUser){
            return next(new AppError("User not found",404));
        }
        const token=jwt.sign({id: updatedUser._id, user:updatedUser, lastActivity: Date.now()}, process.env.JWT_SECRET, {expiresIn:'1h'});

        return res.status(200).json({
            status:true,
            message:"User updated successfully",
            user: updatedUser,
            token
        })

    } catch(error){
        return next(new AppError(error,500));
    }
}