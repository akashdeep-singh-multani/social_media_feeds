const mongoose=require('mongoose');
const { post } = require('..');

const likeSchema=new mongoose.Schema({
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

module.exports=mongoose.model('Like',likeSchema);