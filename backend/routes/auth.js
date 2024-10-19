const express=require('express');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const User=require('../models/user');
const {body,validationResult}=require('express-validator');

const router=express.Router();

router.post('/signup', [
    body('username').isLength({min:3}).withMessage('Username must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
], async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {username, password, email}=req.body;
    try{
        const newUser=new User({username,password,email});
        await newUser.save();
        return res.status(201).json({status:true, message:'User created'});
    } catch(error){
        return next(new AppError('Error creating user',400));
    }
});


router.post('/login',[
    body('username').notEmpty().withMessage("Username is required"),
    body('password').notEmpty().withMessage("Password is required"),
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new AppError(errors.array(),400));
    }

    const {username,password}=req.body;
    const user=User.findOne({username});
    if(!user || !(await user.comparePassword(password))){
        return next(new AppError("Invalid credentials",401));
    }
    const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
    res.json({token});
});

router.get('/protected', passport.authenticate('jwt', {session:false}), (req,res)=>{
    res.json({message: 'Protected route', user: req.user});
});

module.exports=router;

module.exports=router;