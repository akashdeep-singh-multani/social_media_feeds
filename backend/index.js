const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const mongoose=require('./config/db');
const postRoutes=require('./routes/postRoutes');


const app=express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);

module.exports=app;