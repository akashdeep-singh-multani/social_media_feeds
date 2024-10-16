const mongoose=require('mongoose');
const Comment = require('../models/comments');
const AppError = require('../utils/AppError');

exports.getCommentsByPostId=async(req,res,next)=>{
    try{
        const post_id=req.params.postId;
        console.log("post_id: "+post_id);
        const comments=await Comment.find({post_id}).sort({createdAt:-1});
        return res.status(200).json({
            status:true,
            data: comments
        });
    } catch(error){
        return next(new AppError("Failed to load comments",500))
    }
}

exports.createComment=async(req,res,next)=>{
    const {post_id, commenter_id, text}=req.body;
    // const commenter_id=req.body.commenter_id;
    // const postId=req.body.post_id;
    // const text=req.body.text;
    try{
        const newComment=new Comment({commenter_id, post_id, text})
        await newComment.save();
        res.status(201).json({
            status:true,
            message:'Comment added successfully'
        });
    }
    catch(error){
        return next(new AppError(error,400));
    }
}