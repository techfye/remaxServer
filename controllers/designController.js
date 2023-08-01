const asyncHandler = require('express-async-handler');
const Design = require('../models/Design');
const slugify = require('slugify');
const fs = require("fs")

const createDesign = asyncHandler(async (req, res) => {
    const { name } = req.body;
    // var url = req.protocol + '://' + req.get('host')
    // if (req.file !== undefined) {
    //     var photo = url + '/uploads/images/' + req.file.filename;
    // }
    // else {
    //     var photo = url + '/uploads/images/placeholder.png'
    // }

    const slug = slugify(name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });

    const design = new Design({
        name: name,
        slug: slug,
    });
    const createdDesign = await design.save();
    res.status(201).json({ message: 'Design created successfully', createdDesign });
}
);

const updateDesign = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const design = await Design.findById(req.params.id);
    // var url = req.protocol + '://' + req.get('host')
    // if (req.file !== undefined) {
    //     var photo = url + '/uploads/images/' + req.file.filename;
    // }

    if (design) {
        design.name = name;
        design.slug = slugify(name, {
            lower: true
        });
        const updatedDesign = await design.save();
        res.status(201).json(updatedDesign);
    } else {
        res.status(404);
        throw new Error('Design not found');
    }
}
);


const deleteDesign = asyncHandler(async (req, res) => {
    const design = await Design.findById(req.params.id);
    if (design) {
        const removeDesign = await design.deleteOne();
        res.json(removeDesign);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});


const getAllDesign = asyncHandler(async (req, res) => {
    let design = await Design.find({});

    design.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA === "all designs") {
            return -1;
        }
        if (nameB === "all designs") {
            return 1;
        }
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
    });

    res.json(design);
}
);

module.exports = { createDesign, updateDesign, deleteDesign, getAllDesign };
