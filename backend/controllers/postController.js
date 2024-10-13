const Post=require('../models/post');
const AppError = require('../utils/AppError');

exports.getPosts=async(req,res, next)=>{
    try{
        const posts=await Post.find().sort({createdAt:-1});
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch(error){
        // res.status(500).json({})
        return next(new AppError('Failed to retrieve posts', 500))
    }
};


exports.createPost=async(req,res)=>{
    const {title, content, image}=req.body;
    const newPost=new Post({title, content, image});
    try{
        const savedPost=newPost.save();
         res.status(201).json(savedPost);
    }
    catch(error){
        return next(new AppError('Failed to create post', 400));
    }
}