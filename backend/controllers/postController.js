const Post=require('../models/post');
const AppError = require('../utils/AppError');
const { emitNewPost } = require('../utils/socket.util');
const User=require('../models/user');

exports.getPosts=async(req,res, next)=>{
    try{
        const posts=await Post.find().sort({createdAt:-1}).populate('user_id', '_id username image');
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch(error){
        return next(new AppError('Failed to retrieve posts', 500))
    }
};


exports.createPost=async(req,res,next)=>{
    const text=req.body.text;
    const newPost=new Post({text, image:req.file ? req.file.filename:null, user_id:req.body.user_id});
    try{
        const savedPost=await newPost.save();
        const userInfo=await User.findById(req.body.user_id);
        const modifiedPost=savedPost.toObject();
        modifiedPost.username=userInfo.username;
        emitNewPost(modifiedPost);
         return res.status(201).json({status:true, message:"Post uploaded successfully", post:savedPost});
    }
    catch(error){
        return next(new AppError(error, 400));
    }
}