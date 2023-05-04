const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  listingId: {
    type: String,
  },
  fromUserId: {
    type: String,
  },
  toUserId: {
    type: String,
  },
  content: {
    type: String,
  },
  dateTime: {
    type: Number,
  },
});

module.exports = mongoose.model("Message", messageSchema);
