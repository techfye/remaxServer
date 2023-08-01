const asyncHandler = require('express-async-handler');
const Brand = require('../models/Brand');
const slugify = require('slugify');
const fs = require("fs")

const createBrand = asyncHandler(async (req, res) => {
    const { name, photo } = req.body;
    const slug = slugify(name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });

    const brand = new Brand({
        name: name,
        slug: slug,
        photo: photo
    });
    const createdBrand = await brand.save();
    res.status(201).json({ message: 'Brand created successfully', createdBrand });
}
);

const updateBrand = asyncHandler(async (req, res) => {
    const { name, photo } = req.body;
    const brand = await Brand.findById(req.params.id);
    if (brand) {
        brand.name = name;
        brand.slug = slugify(name, {
            lower: true
        });
        brand.photo = photo
        const updatedBrand = await brand.save();
        res.status(201).json(updatedBrand);
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
}
);


const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
        const deleteImages = brand.photo;
        deleteImages.forEach((image) => {
            const imageName = image.split("/")[5];
            fs.unlink(`uploads/images/${imageName}`, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
        const removedBrand = await brand.deleteOne();
        res.json(removedBrand);
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
});


const getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    brands.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA === "all brands") {
            return -1;
        }
        if (nameB === "all brands") {
            return 1;
        }
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
    });
    res.json(brands);
}
);

module.exports = { createBrand, updateBrand, deleteBrand, getAllBrands };
