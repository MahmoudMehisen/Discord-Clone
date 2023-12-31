const authSocket = require("./middleware/authSocket")
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const {disconnect} = require("mongoose");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const serverStore = require("./serverStore");
const directMessageHandler = require("./socketHandlers/directMessageHandler")
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const roomCreateHandler = require("./socketHandlers/roomCreateHandler");
const roomJoinHandler = require("./socketHandlers/roomJoinHandler");
const leaveRoomHandler = require("./socketHandlers/leaveRoomHandler");
const roomInitConnectionHandler = require("./socketHandlers/roomInitConnectionHandler");
const roomSignalingDataHandler = require("./socketHandlers/roomSignalingDataHandler");


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

    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit(
            'online-users', {onlineUsers}
        );
    }

    io.on('connection', (socket) => {
        console.log("user connected");

        newConnectionHandler(socket, io);
        emitOnlineUsers();

        socket.on("direct-message", (data) => {
            directMessageHandler(socket, data);
        });

        socket.on("direct-chat-history", (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on("room-create", () => {
            roomCreateHandler(socket);
        });

        socket.on("room-join", (data) => {
            roomJoinHandler(socket, data);
        })

        socket.on("room-leave", (data) => {
            console.log("room leave");
            leaveRoomHandler(socket, data);
        });

        socket.on("conn-init", (data) => {
            roomInitConnectionHandler(socket,data);
        })

        socket.on("conn-signal", (data) => {
            roomSignalingDataHandler(socket, data);
        });

        socket.on('disconnect', () => {
            disconnectHandler(socket);
        })
    });

    setInterval(() => {
        emitOnlineUsers();
    }, [1000 * 8]);

}

module.exports = {
    registerSocketServer
}