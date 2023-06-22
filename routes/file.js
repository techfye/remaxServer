const express = require('express');
const upload = require("../middleware/fileUpload");
const router = express.Router();

const { uploadFile, deleteFile } = require("../controllers/fileController");

router.route("/upload").post(upload.array("photos"), uploadFile);
router.route("/delete/:img").post(deleteFile);

module.exports = router;