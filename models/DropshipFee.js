const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const DropshipFeeSchema = new Schema({
    id: {
        type: Number,
    },
    fees: {
        type: String,
    },
}, {
    timestamps: true
});

DropshipFeeSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("DropshipFee");
        doc.id = seq;
    }
    next();
});

const DropshipFee = mongoose.model("DropshipFee", DropshipFeeSchema);
module.exports = DropshipFee;