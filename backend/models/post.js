const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    // title: String,
    // content: String,
    user_id:{
        // type:mongoose.Schema.Types.ObjectId,
        // for testing only doing the following until user id is sent through frontend
        type:Number,
        required:true
    },
    text:{
        type: String,
        required: true  
    },
    image: {
        type:String,
        default:null
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports=mongoose.model('Post', postSchema);