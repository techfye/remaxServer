const express = require("express");
const router = express.Router();

const { addSubCategory, deleteSubCategory, updateSubCategory, getSubCategory } = require("../controllers/subCategoryController");

router.route("/").get(getSubCategory).post(addSubCategory);
router.route("/:id").put(updateSubCategory).delete(deleteSubCategory );

module.exports = router;