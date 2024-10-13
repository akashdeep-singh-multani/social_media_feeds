const express=require('express');
const router=express.Router();
const Post=require('../models/post');
const { getPosts, createPost } = require('../controllers/postController');

router.post('/create', createPost);
router.get('/posts', getPosts);

module.exports=router;
