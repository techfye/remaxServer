const asyncHandler = require('express-async-handler');
const Address = require('../models/Address');
const slugify = require('slugify');

const createAddress = asyncHandler(async (req, res) => {
    const { street, city, state, zipCode, isResidential } = req.body;
    const user = req.user.id;
    const address = new Address({
        street: street,
        user: user,
        city: city,
        state: state,
        zipCode: zipCode,
        isResidential: isResidential
    });
    const createdAddress = await address.save();
    res.status(201).json({ message: 'Address created successfully', createdAddress });
});

const updateAddress = asyncHandler(async (req, res) => {
    const user = req.user.id;
    const { street, city, state, zipCode, isResidential } = req.body;
    const address = await Address.findById(req.params.id);
    if (user.toString() === address.user.toString()) {
        if (address) {
            address.street = street;
            address.city = city;
            address.state = state;
            address.zipCode = zipCode;
            address.isResidential = isResidential;
            const updatedAddress = await address.save();
            res.json({ message: 'Address updated successfully', updatedAddress });
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized to update this address');
    }

});

const deleteAddress = asyncHandler(async (req, res) => {
    const user = req.user.id;
    const address = await Address.findOne({ id: req.params.id });
    if (user.toString() === address.user.toString()) {
        if (address) {
            await address.remove();
            const removedAddress = address;
            res.json({ message: 'Address deleted successfully', removedAddress });
        }
    } else {
        res.status(401);
        throw new Error('Not authorized to delete this address');
    }

});

const getAllUserAddress = asyncHandler(async (req, res) => {
    const user = req.user.id;
    const addresses = await Address.find({ user: user });
    if (addresses) {
        res.json(addresses);
    } else {
        res.status(404);
        throw new Error('No addresses found');
    }
});



module.exports = { createAddress, updateAddress, deleteAddress, getAllUserAddress };