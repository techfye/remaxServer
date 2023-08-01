const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const DesignSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        default: 'All'
    },
    slug: {
        type: String,
        // required: true
    },
    count: {
        type: Number,
    }
}, {
    timestamps: true
});


DesignSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Design");
        doc.id = seq;
    }
    next();
});





const Design = mongoose.model("Design", DesignSchema);
module.exports = Design;