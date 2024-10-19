const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
require('dotenv').config();
const errorHandler=require('./middleware/errorMiddleware');
const mongoose=require('./config/db');
const passport=require('passport');

const authRoutes=require('./routes/auth');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/commentRoutes');

const app=express();

app.use(cors());
app.use(bodyParser.json());

//Initialize passport
app.use(passport.initialize());
//Load Passport configuration
require('./config')(passport);


app.use('/api/auth', authRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use(errorHandler);
module.exports=app;