const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation")
const friendUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
    const {targetEmailAddress} = req.body;

    const {userId, email} = req.user;

    if (email.toLowerCase() === targetEmailAddress.toLowerCase()) {
        return res.status(409).send("Sorry. You cannot become friend with yourself");
    }

    const targetUser = await User.findOne({
        email: targetEmailAddress.toLowerCase(),
    })

    if (!targetUser) {
        return res.status(404).send(`Friend of ${targetEmailAddress} has not been found. Please check email address.`)
    }


    if (email.toLowerCase() === targetEmailAddress.toLowerCase()) {
        return res.status(409).send("Sorry. You cannot become friend with yourself");
    }

    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id
    })

    if (invitationAlreadyReceived) {
        return res.status(409).send("Invitation has been already sent");
    }

    const usersAlreadyFriends = targetUser.friends.find(
        (friendId) => friendId.toString() === userId.toString()
    )

    if (usersAlreadyFriends) {
        return res.status(409).send("Friend already added. Please check friend list");
    }

    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id
    })

     friendUpdates.updateFriendsPendingInvitations(targetUser._id.toString());


    return res.status(200).send("Invitation has been sent");
}

module.exports = postInvite;