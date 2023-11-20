const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
});

module.exports = mongoose.model("Conversations", conversationSchema);
