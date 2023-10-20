const User = require("../../models/user");
const Invitation = require("../../models/friendInvitation")

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

    const invitationAlreadyReceived = await Invitation.findOne({
        senderId: userId,
        receiverId: targetUser._id
    })

    if(invitationAlreadyReceived){
        return res.status(409).send("Invitation has been already sent");
    }

    const usersAlreadyFriends = targetUser.friends.find(
        (friendId)=> friendId.toString() === userId.toString()
    )

    if(usersAlreadyFriends){
        return res.status(409).send("Friend already added. Please check friend list");
    }


    return res.send("");
}

module.exports = postInvite;