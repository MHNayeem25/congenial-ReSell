const mongoose = require("mongoose");

// {
//     id: 1,
//     title: "Red jacket for sale",
//     price: 100,
//     image: require("../assets/jacket.jpg"),
//   }

const listSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    imageUri: { type: String },
    imageId: { type: String },
  },
});

module.exports = mongoose.model("Listing", listSchema);
