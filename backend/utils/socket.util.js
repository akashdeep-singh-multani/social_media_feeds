const {Server}=require('socket.io');
let io;

const initSocket=(server)=>{
    io=new Server(server, {
        cors:{
            origin: "http://localhost:4200",
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials:true
        }
    });

    io.on('connection', (socket)=>{
        console.log("New client connected");
        socket.on('disconnect',()=>{
            console.log("Client disconnected");
        });
    });
}


const emitNewPost=(post)=>{
    if(io){
        io.emit('newPost',post);
    }
}

module.exports={initSocket, emitNewPost};

