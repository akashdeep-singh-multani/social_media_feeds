const Post=require('../models/post');
const AppError = require('../utils/AppError');
const { emitNewPost } = require('../utils/socket.util');

exports.getPosts=async(req,res, next)=>{
    // const {offset=0, limit=10}=req.query;
    try{
        // .sort({createdAt:-1})
        // .skip(Number(offset)).limit(Number(limit))
        const posts=await Post.find().sort({createdAt:-1}).populate('user_id', '_id username image');
        // console.log("posts: "+posts)
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch(error){
        // res.status(500).json({})
        return next(new AppError('Failed to retrieve posts', 500))
    }
};


exports.createPost=async(req,res,next)=>{
    // const {title, content, image}=req.body;
    const text=req.body.text;
    // let imageUrl="";
    // if(req.file){
    //     imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    // }
    const newPost=new Post({text, image:req.file ? req.file.filename:null, user_id:req.body.user_id});
    try{
        const savedPost=await newPost.save();
        emitNewPost(savedPost);
         return res.status(201).json({status:true, message:"Post uploaded successfully", post:savedPost});
    }
    catch(error){
        return next(new AppError(error, 400));
    }
}