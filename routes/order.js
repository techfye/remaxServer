const express = require("express");
const router = express.Router();
const getuser = require("../middleware/getuser");
const { AddOrder, GetOrders, UpdateOrderStatus, getOrderByCustomer, updateOrderStatusByAdmin } = require("../controllers/orderController");

router.route("/").post(getuser, AddOrder).get(getuser, GetOrders);
router.route("/guest").post(AddOrder);
router.route("/customer-order").get(getuser, getOrderByCustomer);
router.route("/:id").put(getuser, UpdateOrderStatus);
router.route("/admin/:id").put(getuser, updateOrderStatusByAdmin);

module.exports = router;