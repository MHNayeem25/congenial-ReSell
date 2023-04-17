const express = require("express");

const router = express.Router();

const { getListings } = require("../controller/listController");

router.route("/listings").get(getListings); //get all listings

module.exports = router;
