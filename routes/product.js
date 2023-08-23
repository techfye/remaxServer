const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const getuser = require("../middleware/getuser");

const { getProducts, updateStatus, getProductById, createProduct, updateProduct, deleteProduct, getProductsByUser, getProductsByQuery, getProductsWithToken, getProductsforAdmin, updateproductimageurl, getFilteredProducts, importProducts, getAllProductsBySearch } = require("../controllers/productController");


router.route("/all").get(getAllProductsBySearch);
router.route("/").get(getProducts)
router.route("/filter").get(getFilteredProducts);
router.route("/search/filter").get(getProductsByQuery);
router.route("/adminproducts").get(getProductsforAdmin);
router.route("/tier-products").get(getuser, getProductsWithToken);
router.route("/user").get(getuser, getProductsByUser);
router.route("/:id").get(getProductById);
router.route("/create").post(getuser, createProduct);
router.route("/update/:id").put(updateProduct);
router.route("/update-status/:id").put(updateStatus);
router.route("/delete/:id").delete(deleteProduct);
router.route("/updateproductimageurl").put(updateproductimageurl);
router.route("/import").put(upload.single("file"), importProducts);

module.exports = router;
