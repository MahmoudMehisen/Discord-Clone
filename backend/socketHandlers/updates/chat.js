const Conversation = require("../../models/conversation");
const serverStore = require("../../serverStore");

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Messages",
    populate: {
      path: "author",
      model: "Users",
      select: "username _id",
    },
  });

  if (conversation) {
    const io = serverStore.getSocketServerInstance();

    if (toSpecifiedSocketId) {
      // initial update of chat history
      console.log("send message to ..")

      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    // check if users of this conversation are online
    // if yes emit to them update of messages

    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections(
        userId.toString()
      );
        console.log(activeConnections);
      activeConnections.forEach((socketId) => {
        console.log("send message to ....")
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = { updateChatHistory };
