const express=require('express');
const router=express.Router();
const likeController=require('../controllers/likeController');

router.post('/posts/:postId/likes', likeController.createPostLike);
router.get('/posts/:postId/likes', likeController.getPostLikes);
router.delete('/posts/:postId/likes/:likeId', likeController.deletePostLikes);

router.post('/comments/:commentId/likes', likeController.createCommentLike);
router.get('/comments/:commentId/likes', likeController.getCommentLikes);
router.delete('/comments/:commentId/likes/:likeId', likeController.deleteCommentLikes);

module.exports=router;