const express=require('express');
const passport=require('passport');
const {body}=require('express-validator');
const { login, signup, protectedRoute, userInfo } = require('../controllers/authController');
const verifyToken = require('../middleware/verify-token');

const router=express.Router();



router.post('/signup', [
    body('username').isLength({min:3}).withMessage('Username must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
], signup);


router.post('/login',[
    body('username').notEmpty().withMessage("Username is required"),
    body('password').notEmpty().withMessage("Password is required"),
],login);

router.use(verifyToken);
router.get('/protected', passport.authenticate('jwt', {session:false}), protectedRoute);
router.post('/user-info', userInfo);


module.exports=router;