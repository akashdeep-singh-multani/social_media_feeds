const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    // title: String,
    // content: String,
    text:String,
    image: String,
    created_at: {type: Date, Default: Date.now}
});

module.exports=mongoose.model('Post', postSchema);