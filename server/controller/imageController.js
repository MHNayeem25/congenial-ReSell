const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_kEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
  signature_algorithm: "sha256",
});

exports.getSignature = async (req, res, next) => {
  try {
    const timestamp = new Date().getTime();
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        // eager: "w_400,h_300,c_pad|w_260,h_200,c_crop",
        // public_id: "sample_image",
      },
      process.env.CLOUDINARY_SECRET
    );
    res.status(200).send({
      signature,
      timestamp,
    });
  } catch (error) {
    return error;
  }
};
