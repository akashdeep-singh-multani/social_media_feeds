const LikePost = require("../models/likePost");
const LikeComment=require("../models/likeComment");
const AppError = require("../utils/AppError");
const User=require('../models/user');
const Post=require('../models/post');
const {emitNewPostLike}=require('../utils/socket.util')

exports.createPostLike=async(req,res,next)=>{
    try{
        const like=new LikePost({
            liker_id: req.body.user_id,
            post_id: req.params.postId
        });
        const likedPost=await like.save();
        const userInfo=await User.findById(req.body.user_id);
        const postInfo=await Post.findById(req.params.postId);
        // console.log("postInfo: "+JSON.stringify(postInfo))
        const postUserInfo=await User.findById(postInfo.user_id);
        // console.log("userInfo: "+JSON.stringify(userInfo))
        if(String(postInfo.user_id) !== String(req.body.user_id)){
            console.log("postInfo.user_id: "+postInfo.user_id);
            console.log("req.body.user_id: "+req.body.user_id);
            const modifiedPostLike=likedPost.toObject();
        modifiedPostLike.likername=userInfo.username;
        modifiedPostLike.userpostedname=postUserInfo.username;
        emitNewPostLike(modifiedPostLike);
        }
        
        let response={
            liker_id:like.liker_id,
            post_id:like.post_id,
            _id:like._id,
            createdAt:like.createdAt
        }
        
        return res.status(201).json({
            status:true,
            message:"post liked successfully",
            data:[
                response
            ]
        })
    } catch(error){
        console.log(error)
        return next(new AppError(error.message,500));
    }
}


exports.getPostLikes=async(req,res,next)=>{
    try{
        const likes=await LikePost.find({post_id:req.params.postId});
        return res.json({
            status:true,
            message:"",
            data:likes.map(like=>{
                    return {
                        liker_id:like.liker_id,
                        post_id:like.post_id,
                        _id:like._id,
                        createdAt:like.createdAt
                    }
            })
        })
    } catch(error){
        return next(new AppError(error.message,500));
    }
}


exports.deletePostLikes=async(req,res,next)=>{
    try{
        const like=await LikePost.findByIdAndDelete(req.params.likeId);
        if(!like)
            return next(new AppError("Like not found",404));
        return res.json({
            status:true,
            message:"Like removed successfully"
        })
    } catch(error){
        return next(new AppError(error.message,500));
    }
}


exports.createCommentLike=async(req,res,next)=>{
    try{
        const like=new LikeComment({
            liker_id: req.body.user_id,
            comment_id: req.params.commentId
        });
        await like.save();
        return res.status(201).json({
            status:true,
            message:"comment liked successfully",
            like
        })
    } catch(error){
        return next(new AppError(error.message,500));
    }
}


exports.getCommentLikes=async(req,res,next)=>{
    try{
        const comments=await LikeComment.find({comment_id:req.params.commentId});
        return res.json({
            status:true,
            comments
        })
    } catch(error){
        return next(new AppError(error.message,500));
    }
}


exports.deleteCommentLikes=async(req,res,next)=>{
    try{
        const comment=await CommentPost.findByIdAndDelete(req.params.commentId);
        if(!comment)
            return next(new AppError("Comment not found",404));
        return res.json({
            status:true,
            message:"Like removed successfully"
        })
    } catch(error){
        return next(new AppError(error.message,500));
    }
}