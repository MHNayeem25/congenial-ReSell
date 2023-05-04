const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },

  image: {
    imageUri: { type: String },
    imageId: { type: String },
    thumbnailUrl: { type: String },
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
