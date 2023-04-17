const List = require("../model/listingModel");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_kEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

exports.getListings = async (req, res, next) => {
  try {
    const listings = await List.find();
    res.status(200).json({
      lisgings: listings,
      message: "Listings found",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
