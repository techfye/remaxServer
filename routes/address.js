const express = require("express");
const router = express.Router();
const getuser = require("../middleware/getuser");

const { createAddress, updateAddress, deleteAddress, getAllUserAddress } = require("../controllers/addressController");
router.route("/").get(getuser, getAllUserAddress);
router.route("/").post(getuser, createAddress);
router.route("/:id").put(getuser, updateAddress);
router.route("/:id").delete(getuser, deleteAddress);

module.exports = router;