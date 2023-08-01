const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const BannerSchema = new Schema({
    id: {
        type: Number,
    },
    url: {
        type: String,
    },
    photo: {
        type: Array,
    }
}, {
    timestamps: true
});

BannerSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Banner");
        doc.id = seq;
    }
    next();
});

const Banner = mongoose.model("Banner", BannerSchema);
module.exports = Banner;