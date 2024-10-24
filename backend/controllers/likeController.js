const LikePost = require("../models/likePost");
const LikeComment=require("../models/likeComment");
const AppError = require("../utils/AppError")

exports.createPostLike=async(req,res,next)=>{
    try{
        const like=new LikePost({
            liker_id: req.body.user_id,
            post_id: req.params.postId
        });
        await like.save();
        return res.status(201).json({
            status:true,
            message:"post liked successfully",
            like
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
            likes
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