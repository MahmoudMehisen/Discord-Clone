const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");


const updateFriendsPendingInvitations = async (userId) => {
    try {
        const pendingInvitations = await FriendInvitation.find({
            receiverId: userId
        }).populate('senderId', '_id username email');

        const receiverList = serverStore.getActiveConnections(userId);
        const io = serverStore.getSocketServerInstance();

        receiverList.forEach(receiverSocketId => {
            io.to(receiverSocketId).emit("friends-invitations", {
                pendingInvitations: pendingInvitations ? pendingInvitations : [],
            })
        })
    } catch (err) {

    }
}

const updateFriends = async (userId) => {
    try {

        // find active connection of specific id
        const receiverList = serverStore.getActiveConnections(userId);
        if (receiverList.length > 0) {
            const user = await User.findById(userId, {_id: 1, friends: 1}).populate('friends', '_id username email');
            if (user) {
                const friendsList = user.friends.map(f => {
                    return {
                        id: f._id,
                        email: f.email,
                        username: f.user,
                    }
                })

                // get io server instance
                const io = serverStore.getSocketServerInstance();

                receiverList.forEach(receiver => {
                    io.to(receiver).emit("friends-list", {friends: friendsList ? friendsList : []});
                })
            }
        }


    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    updateFriendsPendingInvitations,
    updateFriends
}