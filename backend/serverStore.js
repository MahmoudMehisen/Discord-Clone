const connectedUsers = new Map();
let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => {
    return io;
}

const addNewConnectedUser = (socketId, userId) => {
    connectedUsers.set(socketId, {userId});
    console.log("new connect users");
    console.log(userId);
}

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log("user disconnected");
        console.log(socketId);
    }
}

const getActiveConnections = (userId) => {
    const activeConnections = [];

    connectedUsers.forEach(function (key, value) {
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    })

    return activeConnections;
}

const getOnlineUsers = () => {
    const onlineUsers = [];
    connectedUsers.forEach((value, key) => {
        onlineUses.push({socketId: key, userId: value.userId});
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