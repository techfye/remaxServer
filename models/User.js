const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");
const UserSchema = new Schema({
    id: {
        type: Number,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    businessType: {
        type: String,
    },
    companyName: {
        type: String,
    },
    regState: {
        type: String,
    },
    tradeName: {
        type: String,
    },
    inBusinessSince: {
        type: String,
    },
    physicalAddress: {
        type: String,
    },
    shopNumber: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    telBusiness: {
        type: String,
    },
    fax: {
        type: String,
    },
    email: {
        type: String,
    },
    fedTaxId: {
        type: String,
    },
    resaleTaxId: {
        type: String,
    },
    jbtId: {
        type: String,
    },
    password: {
        type: String,
    },
    customerAccount: {
        type: String,
    },
    type:
    {
        type: String,
        enum: ['Retailer', 'Dropshipper', 'Admin', 'Consumer'],
    },
    isApproved: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Blocked', 'Under Review', 'Need Further Documents'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    credit: {
        amount: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 0
        },
    },
    tier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tier",
    },
    signature: {
        type: String
    },

    printTitle: {
        type: String
    },
    printName: {
        type: String
    },
    drivingLicence: {
        type: Array
    },
    resaleFile: {
        type: Array
    },
    privacyPolicy: {
        type: Boolean
    },
    Addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    }],

}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("User");
        doc.id = seq;
    }
    next();
});


const User = mongoose.model("User", UserSchema);
module.exports = User;