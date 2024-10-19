const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    commenter_id:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        //for testing
        // type:Number,
        ref:'User'
    },
    post_id:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    text:{
        required:true,
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Comment', commentSchema);