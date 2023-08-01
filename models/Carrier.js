const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const CarrierSchema = new Schema({
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

CarrierSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Carrier");
        doc.id = seq;
    }
    next();
});

const Carrier = mongoose.model("Carrier", CarrierSchema);
module.exports = Carrier;