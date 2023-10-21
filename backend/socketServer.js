const authSocket = require("./middleware/authSocket")
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const {disconnect} = require("mongoose");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const serverStore = require("./serverStore");
const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST",]
        }
    });

    serverStore.setSocketServerInstance(io);

    io.use((socket, next) => {
        authSocket(socket, next);
    })

    io.on('connection', (socket) => {
        console.log("user connected");
        console.log(socket.id);

        newConnectionHandler(socket, io);

        socket.on('disconnect',()=>{
            disconnectHandler(socket);
        })
    })

}

module.exports = {
    registerSocketServer
}