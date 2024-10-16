const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const errorHandler=require('./middleware/errorMiddleware');
const mongoose=require('./config/db');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/commentRoutes');


const app=express();
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes)

app.use(errorHandler);
module.exports=app;