const express = require("express");
const router = express.Router();

const { createDesign, updateDesign, deleteDesign, getAllDesign } = require("../controllers/designController");

router.route("/").get(getAllDesign).post(createDesign);
router.route("/:id").put(updateDesign).delete(deleteDesign);

module.exports = router;