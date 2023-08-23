const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const { getClientSecret } = require("../controllers/paymentController");



const AddOrder = asyncHandler(async (req, res) => {

    const { shippingInfo, orderItems, itemsPrice, shippingPrice, totalPrice, tax } = req.body;
    const user = req.user?.id;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((item) => {
                return {
                    name: item.name,
                    qty: item.quantity,
                    image: item.images[0],
                    price: item.price,
                    product: item._id,
                };
            }
            ),
            orderNote: shippingInfo.note,
            shippingInfo: {
                name: shippingInfo.firstName + ' ' + shippingInfo.lastName,
                address: shippingInfo.streetAddress + ' ' + shippingInfo.streetAddress2,
                city: shippingInfo.city + ' ' + shippingInfo.state,
                postalCode: shippingInfo.zip,
                country: shippingInfo.country,
                email: shippingInfo.email,
                phone: shippingInfo.phone,
                isResidential: shippingInfo.isResidential
            },
            billingInfo: {
                name: shippingInfo.firstName + ' ' + shippingInfo.lastName,
                address: shippingInfo.streetAddress + ' ' + shippingInfo.streetAddress2,
                city: shippingInfo.city + ' ' + shippingInfo.state,
                postalCode: shippingInfo.zip,
                country: shippingInfo.country,
                email: shippingInfo.email,
                phone: shippingInfo.phone,
                isResidential: shippingInfo.isResidential
            },
            tax: tax,
            paymentMethod: shippingInfo.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
            status: 'Received',
            customer: user
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
}
);

const GetOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("customer")
    const reversedOrder = orders.reverse();
    res.json(reversedOrder);
});

const getOrderByCustomer = asyncHandler(async (req, res) => {
    const orders = await Order.find({ customer: req.user.id }).populate("customer");
    const reversedOrder = orders.reverse();
    res.json(reversedOrder);
});




const UpdateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body
    const getClientSecrets = await getClientSecret();
    const secret = req.header('x-secret');


    if (getClientSecrets === null || getClientSecrets === undefined)
        return res.status(400).json({ message: "Please make a payment!" });

    if (secret !== getClientSecrets)
        return res.status(400).json({ message: "Something Went Wrong" });

    const findOrder = await Order.findById(req.params.id)
    if (findOrder) {
        findOrder.status = status
        findOrder.isPaid = true

        const updateOrder = await findOrder.save();
        res.status(201).json(updateOrder)
    }
})

const updateOrderStatusByAdmin = asyncHandler(async (req, res) => {
    const { status } = req.body
    const findOrder = await Order.findById(req.params.id)
    if (findOrder) {
        findOrder.status = status

        const updateOrder = await findOrder.save();
        res.status(201).json(updateOrder)
    }
})


module.exports = { AddOrder, GetOrders, UpdateOrderStatus, getOrderByCustomer, updateOrderStatusByAdmin };