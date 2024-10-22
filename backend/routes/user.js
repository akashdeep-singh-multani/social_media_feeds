const express=require('express');
const verifyToken = require('../middleware/verify-token');
const { edit } = require('../controllers/userController');
const upload = require('../middleware/upload');

const router=express.Router();

router.use(verifyToken);
router.patch('/edit', upload.single('image'),edit);

module.exports=router;