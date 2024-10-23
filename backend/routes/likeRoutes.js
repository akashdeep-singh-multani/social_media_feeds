const express=require('express');
const router=express.Router();
const likeController=require('../controllers/likeController');

router.post('/:postId/likes', likeController.createPostLike);
router.get('/:postId/likes', likeController.getPostLikes);
router.delete('/:postId/likes/:likeId', likeController.deletePostLikes);

router.post('/:commentId/likes', likeController.createCommentLike);
router.get('/:commentId/likes', likeController.getCommentLikes);
router.delete('/:commentId/likes/:likeId', likeController.deleteCommentLikes);

module.exports=router;