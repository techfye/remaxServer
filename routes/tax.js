const express = require("express");
const router = express.Router();

const { createTax, updateTax, deleteTax, getAllTaxes } = require("../controllers/taxController");

router.route("/").post(createTax).get(getAllTaxes);
router.route("/:id").put(updateTax).delete(deleteTax);

module.exports = router;