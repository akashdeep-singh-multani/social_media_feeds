const Post=require('../models/post');
const AppError = require('../utils/AppError');

exports.getPosts=async(req,res, next)=>{
    try{
        // .sort({createdAt:-1})
        const posts=await Post.find();
        console.log("posts: "+posts)
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch(error){
        // res.status(500).json({})
        return next(new AppError('Failed to retrieve posts', 500))
    }
};


exports.createPost=async(req,res)=>{
    // const {title, content, image}=req.body;
    const text=req.body.text;
    let imageUrl="";
    if(req.file){
        imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    const newPost=new Post({text, image:imageUrl});
    try{
        const savedPost=await newPost.save();
         return res.status(201).json({status:true, message:"Post uploaded successfully"});
    }
    catch(error){
        return next(new AppError('Failed to create post', 400));
    }
}