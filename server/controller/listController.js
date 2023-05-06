const List = require("../model/listingModel");

exports.getListings = async (req, res, next) => {
  try {
    const id = req.headers["user-id"];
    // console.log(id);
    let listings = [];
    if (id) {
      listings = await List.find({ userId: id });
    } else {
      listings = await List.find({});
    }
    // console.log("Called API");
    // console.log(listings);
    res.status(200).json({
      listings: listings,
      message: "Listings found",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.postListing = async (req, res, next) => {
  try {
    const { location, title, price, category, description, image, userId } =
      req.body;
    const listing = await List.create({
      userId,
      location,
      title,
      price,
      category,
      description,
      image,
    });
    //console.log(listing);
    res.status(200).json({
      listing: listing,
      message: "Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
