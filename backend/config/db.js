const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to MongoDB Atlas");
}).catch((error)=>{
    console.error('MongoDB connection error:',error);
});

const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));