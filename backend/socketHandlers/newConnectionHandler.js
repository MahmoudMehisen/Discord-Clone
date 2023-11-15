const serverStore = require("../serverStore")
const friendUpdates = require("./updates/friends");

const newConnectionHandler = async (socket,io)=>{
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
    })

    // update pending friends
    friendUpdates.updateFriendsPendingInvitations(userDetails.userId);

    // update friends list
    friendUpdates.updateFriends(userDetails.userId);
}

module.exports = newConnectionHandler;