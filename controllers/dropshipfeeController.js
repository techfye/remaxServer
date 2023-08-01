const asyncHandler = require('express-async-handler');
const DropshipFee = require('../models/DropshipFee');

const createDropshipFee = asyncHandler(async (req, res) => {
    const { fees } = req.body;
    const DropshipFees = new DropshipFee({
        fees: fees,
    });
    const createdDropshipFee = await DropshipFees.save();
    res.status(201).json({ message: 'DropshipFee Added successfully', createdDropshipFee });
}
);

const updateDropshipFee = asyncHandler(async (req, res) => {
    const { fees } = req.body;
    const Dropship = await DropshipFee.findById(req.params.id);
    if (Dropship) {
        Dropship.fees = fees;
        const updatedDropshipFee = await Dropship.save();
        res.status(201).json(updatedDropshipFee);
    } else {
        res.status(404);
        throw new Error('DropshipFee not found');
    }
}
);




const getAllDropshipFee = asyncHandler(async (req, res) => {
    const DropshipFees = await DropshipFee.find({});
    res.json(DropshipFees);
}
);


module.exports = { getAllDropshipFee, updateDropshipFee, createDropshipFee };
