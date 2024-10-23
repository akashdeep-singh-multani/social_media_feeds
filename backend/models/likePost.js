const mongoose=require('mongoose');

const likePostSchema=new mongoose.Schema({
    liker_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports=mongoose.model('LikePost',likePostSchema);