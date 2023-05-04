const mongoose = require("mongoose");

// {
//     id: 1,
//     title: "Red jacket for sale",
//     price: 100,
//     image: require("../assets/jacket.jpg"),
//   }

const listSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  image: [
    {
      imageUri: { type: String, default: "null" },
      imageId: { type: String, default: "null" },
      thumbnailUrl: { type: String, default: "null" },
    },
  ],
});

module.exports = mongoose.model("Listing", listSchema);
