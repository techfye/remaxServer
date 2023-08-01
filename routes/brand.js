const express = require("express");
const router = express.Router();

const { createBrand, updateBrand, deleteBrand, getAllBrands } = require("../controllers/brandController");

router.route("/").get(getAllBrands).post(createBrand);
router.route("/:id").put(updateBrand).delete(deleteBrand);

module.exports = router;