const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  friends: [{type:Schema.Types.ObjectId, ref:"Users"}]
});

module.exports = mongoose.model("Users", userSchema);
