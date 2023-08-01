const express = require("express");
const router = express.Router();

const { createDropshipFee, updateDropshipFee, getAllDropshipFee } = require("../controllers/dropshipfeeController");

router.route("/").get(getAllDropshipFee).post(createDropshipFee);
router.route("/:id").put(updateDropshipFee);


module.exports = router;