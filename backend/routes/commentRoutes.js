const express=require('express');
const router=express();
const {createComment, getCommentsByPostId}= require('../controllers/commentController');

router.post('/create', createComment);
router.get('/load/:postId', getCommentsByPostId);

module.exports=router;