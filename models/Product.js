const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const ProductSchema = new Schema({
    id: {
        type: Number,
    },
    productID: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    retailerPrice: {
        type: Number,
        required: true
    },
    dropshipperPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Model"
    },
    design: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Design"
    },
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrier",
        required: false
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: false
    },
    skuNumber: {
        type: String,
    },
    images: {
        type: Array,
    },
    // tags: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Tag",
    // },
    barCode: {
        type: String,
        required: true,
        unique: true
    },
    weight: {
        type: String,
    },
    // discount: {
    //     type: String,
    // },
    bestSeller: {
        type: String,
    }
}, {
    timestamps: true
});

ProductSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Product");
        doc.id = seq;
    }
    next();
});


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;