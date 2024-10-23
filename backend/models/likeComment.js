const { default: mongoose } = require("mongoose");

const likeCommentSchema=new mongoose.Schema({
    liker_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        require: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports=mongoose.model('LikeComment',likeCommentSchema);