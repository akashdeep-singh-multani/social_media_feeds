const { validationResult } = require('express-validator');
const User = require('../models/user');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

exports.login=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new AppError(errors.array(),400));
    }

    const {username,password}=req.body;
    const user=await User.findOne({username});
    if(!user || !(await user.comparePassword(password))){
        return next(new AppError("Invalid credentials",401));
    }
    const token=jwt.sign({id:user._id, user, lastActivity: Date.now()}, process.env.JWT_SECRET, {expiresIn:'1h'});
    res.json({token, user});

}

exports.signup=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {username, password, email}=req.body;
    // console.log("username: "+username);
    // console.log("password: "+password);
    // console.log("email: "+email);
    try{
        const newUser=new User({username,password,email});
        await newUser.save();
        return res.status(201).json({status:true, message:'User created'});
    } catch(error){
        return next(new AppError(error,400));
    }
}

exports.protectedRoute=(req,res)=>{
    return res.json({ message: 'Protected route', user: req.user });
}

exports.userInfo=async(req,res, next)=>{
    let user_id=req.body.user_id;
    try{
        let response=await User.find({_id:user_id});
        return res.status(200).json({
            status:true,
            data:response
        });
    }
    catch(error){
        return next(new AppError(error,400));
    }
}