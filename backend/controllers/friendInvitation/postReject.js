const friendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends")
const postReject = async (req, res) => {

    try {
        const {id} = req.body;
        const {userId} = req.user;
        const invitationExists = await friendInvitation.exists({_id: id});

        if (invitationExists) {
            await friendInvitation.findByIdAndDelete(id);
        }

        friendsUpdates.updateFriendsPendingInvitations(userId);

        return res.status(200).send("Invitation successfully rejected");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong please try again.");
    }
    return res.send("reject handler");
};

module.exports = postReject;