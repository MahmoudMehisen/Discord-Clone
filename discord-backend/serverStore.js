const connectedUsers = new Map();

const addNewConnectedUser = (socketId, userId) => {
    connectedUsers.set(socketId, {userId});
    console.log("new connect users");
    console.log(userId);
}

module.exports = {
    addNewConnectedUser,
}