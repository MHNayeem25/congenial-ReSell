const express = require("express");

const router = express.Router();

const { getListings, postListing } = require("../controller/listController");
const {
  loginUser,
  registerUser,
  addToken,
  getUserById,
} = require("../controller/userController");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");
const {
  sendMessage,
  getMessages,
  delMessage,
} = require("../controller/messageController");
const {
  registerVerification,
  messageVerification,
} = require("../middleware/validationSchemas");
const { getSignature } = require("../controller/imageController");

router.route("/listings").get(getListings); //get all listings

router.route("/post/listing").post(postListing); //post listing

router.route("/login").post(validation(registerVerification), loginUser);

router.route("/register").put(validation(registerVerification), registerUser);

router.route("/expoPushToken").put(addToken);

router.route("/postMessage").put(validation(messageVerification), sendMessage);

router.route("/getMessages").get(getMessages);

router.route("/delMessage").put(delMessage);

router.route("/getUserById").get(getUserById);

router.route("/getSignature").get(getSignature);

module.exports = router;
