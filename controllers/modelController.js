const asyncHandler = require('express-async-handler');
const Model = require('../models/Model');
const slugify = require('slugify');


const createModel = asyncHandler(async (req, res) => {
    const { name, brand } = req.body;
    const slug = slugify(name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });

    const model = new Model({
        name: name,
        slug: slug,
        brand: brand
    });
    const newModel = await model.save();

    const createdModel = await newModel.populate('brand');

    res.status(201).json({ message: 'Model created successfully', createdModel });
}
);

const updateModel = asyncHandler(async (req, res) => {
    const { name, brand } = req.body;
    const model = await Model.findById(req.params.id);
    if (model) {
        model.name = name;
        model.slug = slugify(name, {
            lower: true
        });
        model.brand = brand
        const newModel = await model.save();
        const updatedModel = await newModel.populate('brand');
        res.status(201).json(updatedModel);
    } else {
        res.status(404);
        throw new Error('Model not found');
    }
}
);


const deleteModel = asyncHandler(async (req, res) => {
    const model = await Model.findById(req.params.id);
    if (model) {
        const removedModel = await model.deleteOne();
        res.json(removedModel);
    } else {
        res.status(404);
        throw new Error('Model not found');
    }
});


const getAllModels = asyncHandler(async (req, res) => {
    const models = await Model.find({ name: { $ne: 'All' } }).populate('brand');
    res.json(models);
}
);


module.exports = { createModel, updateModel, deleteModel, getAllModels };
