const asyncHandler = require('express-async-handler');
const Tax = require('../models/Tax');

const createTax = asyncHandler(async (req, res) => {
    const { state, tax, customerType } = req.body;

    const createTax = new Tax({
        state,
        tax,
        customerType
    });
    const createdTax = await createTax.save();
    res.status(201).json(createdTax);
}
);

const updateTax = asyncHandler(async (req, res) => {
    const { state, tax, customerType } = req.body;
    const findTax = await Tax.findById(req.params.id);
    if (findTax) {
        findTax.state = state;
        findTax.tax = tax
        findTax.customerType = customerType
        const updatedTax = await findTax.save();
        res.status(201).json(updatedTax);
    } else {
        res.status(404);
        throw new Error('Tax not found');
    }
});


const deleteTax = asyncHandler(async (req, res) => {
    const tax = await Tax.findById(req.params.id);
    if (tax) {
        const removedTax = await tax.deleteOne();
        res.json(removedTax);
    } else {
        res.status(404);
        throw new Error('Tax not found');
    }
});


const getAllTaxes = asyncHandler(async (req, res) => {
    const taxes = (await Tax.find({})).reverse();
    res.json(taxes);
}
);


module.exports = { createTax, updateTax, deleteTax, getAllTaxes };
