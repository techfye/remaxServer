const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const BrandSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    photo: {
        type: Array,
    },
    count: {
        type: Number,
    }
}, {
    timestamps: true
});

BrandSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Brand");
        doc.id = seq;
    }
    next();
});

const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;