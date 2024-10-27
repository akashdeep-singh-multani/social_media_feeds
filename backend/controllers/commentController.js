const mongoose=require('mongoose');
const Comment = require('../models/comments');
const AppError = require('../utils/AppError');
const User=require('../models/user');
const {emitNewPostComment}=require('../utils/socket.util');
const Post=require('../models/post');

exports.getCommentsByPostId=async(req,res,next)=>{
    try{
        const post_id=req.params.postId;
        const comments=await Comment.find({post_id}).sort({createdAt:-1});
        const modifiedComments=await Promise.all(comments.map(async comment=>{
            const commentObj=comment.toObject();
            const userInfo=await User.findById(commentObj.commenter_id);
            commentObj.commenterInfo=userInfo;
            return commentObj;
        }));
        return res.status(200).json({
            status:true,
            data: modifiedComments
        });
    } catch(error){
        return next(new AppError("Failed to load comments",500))
    }
}

exports.createComment=async(req,res,next)=>{
    const {post_id, commenter_id, text}=req.body;
    try{
        const newComment=new Comment({commenter_id, post_id, text})
        await newComment.save();
        const userInfo=await User.findById(commenter_id);
        const postInfo=await Post.findById(post_id);
        const postUserInfo=await User.findById(postInfo.user_id);
        const modifiedComment=newComment.toObject();
        modifiedComment.commenterInfo=userInfo;
        modifiedComment.commentername=userInfo.username;
        modifiedComment.userpostedname=postUserInfo.username;
        emitNewPostComment(modifiedComment);
        res.status(201).json({
            status:true,
            message:'Comment added successfully',
            data:modifiedComment
        });
    }
    catch(error){
        return next(new AppError(error,400));
    }
}