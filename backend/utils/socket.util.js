const { Server } = require('socket.io');
let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:4200", "http://localhost:51289"],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log("New client connected: ", socket.id);

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log("Client disconnected: ", socket.id);
        });

        // Additional event listeners can be added here
    });
};

const emitNewPost = (post) => {
    if (io) {
        try {
            io.emit('newPost', post);
            io.emit('notification', {message: `New post added by ${post.username}`, post});
        } catch (error) {
            console.error("Error emitting new post: ", error);
        }
    } else {
        console.warn("Socket.io is not initialized");
    }
};

const emitNewPostLike=(likeInfo)=>{
    if(io){
        try{
            io.emit('newPostLike', likeInfo);
            io.emit('notification', {message:`${likeInfo.userpostedname} Post liked by ${likeInfo.likername}`});
        }
        catch (error) {
            console.error("Error emitting new post: ", error);
        }
    } 
    else {
        console.warn("Socket.io is not initialized");
    }
}

module.exports = { initSocket, emitNewPost, emitNewPostLike };
