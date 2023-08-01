const express = require("express");
const router = express.Router();

const { createCarrier, updateCarrier, deleteCarrier, getAllCarriers } = require("../controllers/carrierController");

router.route("/").get(getAllCarriers).post(createCarrier);
router.route("/:id").put(updateCarrier).delete(deleteCarrier);

module.exports = router;