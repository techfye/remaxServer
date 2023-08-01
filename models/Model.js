const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const ModelSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        // required: true
        default: 'All'
    },
    slug: {
        type: String,
        // required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    count: {
        type: Number,
    }
}, {
    timestamps: true
});

ModelSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Model");
        doc.id = seq;
    }
    next();
});

const Model = mongoose.model("Model", ModelSchema);
module.exports = Model;