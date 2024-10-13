require('dotenv').config();

const http=require('http');
const app=require('./index');

const server=http.createServer(app);
server.listen(process.env.PORT, process.env.IP,()=>{
    console.log("Server is running on: "+process.env.PORT);
})