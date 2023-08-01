const express = require("express");
const router = express.Router();

const { createBanner, updateBanner, deleteBanner, getAllBanners } = require("../controllers/bannerController");

router.route("/").post(createBanner).get(getAllBanners);
router.route("/:id").put(updateBanner).delete(deleteBanner);

module.exports = router;