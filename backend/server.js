require('dotenv').config();

const http=require('http');
const app=require('./index');
const { initSocket } = require('./utils/socket.util');

const server=http.createServer(app);
initSocket(server);
server.listen(process.env.PORT, process.env.IP,()=>{
    console.log("Server is running on: "+process.env.PORT);
})