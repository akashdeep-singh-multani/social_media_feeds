const express=require('express');
const router=express();
const {createComment, getCommentsByPostId}= require('../controllers/commentController');
const verifyToken = require('../middleware/verify-token');

router.use(verifyToken);

router.post('/create', createComment);
router.get('/load/:postId', getCommentsByPostId);

module.exports=router;