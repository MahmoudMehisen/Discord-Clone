const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const friendInvitationSchema = new mongoose.Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
});

module.exports = mongoose.model("FriendInvitations", userSchema);
