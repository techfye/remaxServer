const express = require("express");
const router = express.Router();
const getuser = require("../middleware/getuser");

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct , getProductsByUser, getProductsWithToken, getProductsforAdmin, updateproductimageurl } = require("../controllers/productController");


router.route("/").get(getProducts);
router.route("/adminproducts").get(getProductsforAdmin);
router.route("/tier-products").get(getuser, getProductsWithToken);
router.route("/user").get(getuser, getProductsByUser);
router.route("/:id").get(getProductById);
router.route("/create").post(getuser, createProduct);
router.route("/update/:id").put(updateProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/updateproductimageurl").put(updateproductimageurl);

module.exports = router;