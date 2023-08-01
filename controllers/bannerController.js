const asyncHandler = require('express-async-handler');
const Banner = require('../models/Banner');
const fs = require("fs")

const createBanner = asyncHandler(async (req, res) => {
    const { url, photo } = req.body;

    const banner = new Banner({
        url: url,
        photo: photo
    });
    const createdBrand = await banner.save();
    res.status(201).json({ message: 'Banner created successfully', createdBrand });
}
);

const updateBanner = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { url, photo } = req.body;
    const banner = await Banner.findById(req.params.id);
    console.log(banner)
    if (banner) {
        banner.url = url;
        banner.photo = photo
        const updatedBanner = await banner.save();
        res.status(201).json(updatedBanner);
    } else {
        res.status(404);
        throw new Error('Banner not found');
    }
});


const deleteBanner = asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);
    if (banner) {
        const deleteImages = banner.photo;
        deleteImages.forEach((image) => {
            const imageName = image.split("/")[5];
            fs.unlink(`uploads/images/${imageName}`, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
        const removedBanner = await banner.deleteOne();
        res.json(removedBanner);
    } else {
        res.status(404);
        throw new Error('Banner not found');
    }
});


const getAllBanners = asyncHandler(async (req, res) => {
    const banners = (await Banner.find({})).reverse();
    res.json(banners);
}
);


module.exports = { createBanner, updateBanner, deleteBanner, getAllBanners };
