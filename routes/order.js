const express = require("express");
const router = express.Router();
const { AddOrder, GetOrders, UpdateOrderStatus } = require("../controllers/orderController");

router.route("/").post(AddOrder).get(GetOrders);
router.route("/:id").put(UpdateOrderStatus)

module.exports = router;