const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");
const AddressSchema = new Schema({
    id: {
        type: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    isResidential: {
        type: Boolean,
        required: true
    },

}, { timestamps: true });

AddressSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Address");
        doc.id = seq;
    }
    next();
});


const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;

