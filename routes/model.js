const express = require("express");
const router = express.Router();

const { createModel, updateModel, deleteModel, getAllModels } = require("../controllers/modelController");

router.route("/").get(getAllModels).post(createModel);
router.route("/:id").put(updateModel).delete(deleteModel);

module.exports = router;