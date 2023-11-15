const friendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const friendsUpdates = require("../../socketHandlers/updates/friends")

const postAccept = async (req, res) => {
    try {
        const {id} = req.body;
        const invitation = await friendInvitation.findById(id);

        if (!invitation) {
            return res.status(401).send("No Invitation found");
        }

        const {senderId, receiverId} = invitation;
        const senderUser = await User.findById(senderId);
        senderUser.friends = [...senderUser.friends, receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends, senderId];

        await senderUser.save();
        await receiverUser.save();

        await friendInvitation.findByIdAndDelete(id);

        friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

        return res.status(200).send("Friend successfully added");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong. Please try again");
    }
};

module.exports = postAccept;
