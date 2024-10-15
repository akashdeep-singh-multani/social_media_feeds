const express=require('express');
const router=express.Router();
// const Post=require('../models/post');
const { getPosts, createPost } = require('../controllers/postController');
const upload=require('../middleware/upload');

router.post('/create', upload.single('image'),createPost);
router.get('/posts', getPosts);

module.exports=router;
