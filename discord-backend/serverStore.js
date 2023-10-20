const connectedUsers = new Map();

const addNewConnectedUser = (socketId, userId) => {
    connectedUsers.set(socketId, {userId});
    console.log("new connect users");
    console.log(userId);
}

const removeConnectedUser = (socketId) =>{
    if(connectedUsers.has(socketId)){
        connectedUsers.delete(socketId);
        console.log("user disconnected");
        console.log(socketId);
    }
}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser
}