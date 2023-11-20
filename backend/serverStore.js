const connectedUsers = new Map();
let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => {
    return io;
}

const addNewConnectedUser = ({socketId, userId}) => {
    connectedUsers.set(socketId, {userId});
    console.log("new connect users");
}

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log("user disconnected");
    }
}

const getActiveConnections = (userId) => {
    const activeConnections = [];
    console.log(userId);
    connectedUsers.forEach(function (value, key) {
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    })

    console.log(connectedUsers);

    return activeConnections;
}

const getOnlineUsers = () => {
    const onlineUsers = [];
    connectedUsers.forEach((value, key) => {
        onlineUsers.push({socketId: key, userId: value.userId});
    });
    return onlineUsers;
}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    getSocketServerInstance,
    setSocketServerInstance,
    getOnlineUsers
}