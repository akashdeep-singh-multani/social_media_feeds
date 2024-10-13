const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('./config/db');
const postRoutes=require('./routes/postRoutes');

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);

module.exports=app;