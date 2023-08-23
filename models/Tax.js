const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const TaxSchema = new Schema({
    id: {
        type: Number,
    },
    state: {
        type: String,
    },
    tax: {
        type: String,
    },
    customerType: {
        type: String,
    }
}, {
    timestamps: true
});

TaxSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Tax");
        doc.id = seq;
    }
    next();
});

const Tax = mongoose.model("Tax", TaxSchema);
module.exports = Tax;