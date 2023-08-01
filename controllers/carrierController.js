const asyncHandler = require('express-async-handler');
const Carrier = require('../models/Carrier');
const slugify = require('slugify');
const fs = require("fs")

const createCarrier = asyncHandler(async (req, res) => {
    const { name, photo } = req.body;
    const slug = slugify(name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });

    const carrier = new Carrier({
        name: name,
        slug: slug,
        photo: photo
    });
    const createdCarrier = await carrier.save();
    res.status(201).json({ message: 'Carrier created successfully', createdCarrier });
}
);

const updateCarrier = asyncHandler(async (req, res) => {
    const { name, photo } = req.body;
    const carrier = await Carrier.findById(req.params.id);
    if (carrier) {
        carrier.name = name;
        carrier.slug = slugify(name, {
            lower: true
        });
        carrier.photo = photo
        const updatedCarrier = await carrier.save();
        res.status(201).json(updatedCarrier);
    } else {
        res.status(404);
        throw new Error('Carrier not found');
    }
}
);


const deleteCarrier = asyncHandler(async (req, res) => {
    const carrier = await Carrier.findById(req.params.id);
    if (carrier) {
        const deleteImages = carrier.photo;
        deleteImages.forEach((image) => {
            const imageName = image.split("/")[5];
            fs.unlink(`uploads/images/${imageName}`, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
        const removedCarrier = await carrier.deleteOne();
        res.json(removedCarrier);
    } else {
        res.status(404);
        throw new Error('Carrier not found');
    }
});


const getAllCarriers = asyncHandler(async (req, res) => {
    const carriers = await Carrier.find({});
    res.json(carriers);
}
);


module.exports = { createCarrier, updateCarrier, deleteCarrier, getAllCarriers, };
