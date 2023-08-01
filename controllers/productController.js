const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Design = require("../models/Design");
const Model = require("../models/Model");
const Brand = require("../models/Brand")
const Category = require("../models/Category");
const Carrier = require("../models/Carrier");
const User = require("../models/User");
const slugify = require("slugify");
const fs = require("fs")

// get all products
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 40;
  const startIndex = (page - 1) * limit;
  const productsfind = await Product.find({}).skip(startIndex).limit(limit).populate("category").populate("subcategory").populate("brand").populate("carrier").populate("design").populate("model")
  const products = productsfind.reverse()
  res.json(products);
});

const getProductsforAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 15; // Number of items per page
  const startIndex = (page - 1) * limit;
  const productsfind = await Product.find({}).populate("category").populate("subcategory").populate("brand").populate("carrier").populate("design").populate("model");
  const products = productsfind.reverse();
  res.json(products);
});

const getProductsWithToken = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const startIndex = (page - 1) * limit;
  const user = req.user.id;
  // const products = await Product.find({}).populate("category").populate("subcategory").populate('tags').skip(startIndex).limit(limit);
  // const productsfind = await Product.find({}).populate("category").populate("subcategory").populate('tags');
  const productsfind = await Product.find({}).populate("category").populate("subcategory").populate("brand").populate("carrier").populate("design").populate("model");
  const products = productsfind.reverse();
  const userType = await User.findById(user).populate("tier");

  if (userType.type === "Retailer" || userType.type === "Dropshipper") {
    const productsByTier = products.map((product) => {
      const { price, tags } = product;
      let tagValue = 1; // Default tag value if tags property doesn't exist
      if (tags) {
        tagValue = userType.type === "Retailer" ? tags.retailerValue : tags.dropshipperValue;
      }
      let tierPercentage = userType.tier ? userType.tier.percentage : 0;
      let tagPrice = (price / tagValue);
      let tierPrice = tagPrice - (tagPrice * tierPercentage) / 100;
      product.price = tierPrice.toFixed(2);
      return product;
    });
    res.json(productsByTier);
  }
});

// get product by id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// create product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    subcategory,
    skuNumber,
    barCode,
    price,
    retailerPrice,
    dropshipperPrice,
    stock,
    bestSeller,
    brand,
    model,
    design,
    carrier,
    weight,
    description,
    photos,

  } = req.body;
  let carri = null;
  let sub = null;
  let bran = null;
  let mode = null;
  let des = null;

  const productExists = await Product.findOne({ barCode });
  if (productExists) {
    res.status(400).json({ message: "Product Barcode already exists" });
    return
  }

  // const user = req.user.id;
  let slug = slugify(name, {
    lower: true,
  });

  slug = slug + "-" + barCode;
  const productCat = await Category.findById(category);

  if (subcategory !== 'null') {
    sub = subcategory;
  }

  if (brand !== 'null') {
    bran = brand;
  }

  if (carrier !== '') {
    carri = carrier;
  }

  if (model !== 'null') {
    mode = model;
  }

  if (design !== null) {
    des = design
  }

  const product = new Product({
    name,
    slug,
    category,
    subcategory: sub,
    skuNumber,
    barCode,
    price,
    retailerPrice,
    dropshipperPrice,
    stock,
    bestSeller,
    brand: bran,
    model: mode,
    design: des,
    carrier: carri,
    weight,
    description,
    images: photos,
  });

  const savedProduct = await product.save();

  const saved = await savedProduct.populate(["category", "subcategory", "brand", "carrier", "design", "model"]);
  res.status(201).json(saved);
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    subcategory,
    skuNumber,
    barCode,
    price,
    retailerPrice,
    dropshipperPrice,
    stock,
    bestSeller,
    brand,
    model,
    design,
    carrier,
    weight,
    description,
    photos,
  } = req.body;

  let slug = slugify(name, {
    lower: true,
  });
  slug = slug + "-" + barCode;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.slug = slug;
    product.category = category;
    product.skuNumber = skuNumber;
    product.barCode = barCode;
    product.price = price;
    product.retailerPrice = retailerPrice;
    product.dropshipperPrice = dropshipperPrice;
    product.stock = stock;
    product.bestSeller = bestSeller;
    product.weight = weight;
    product.description = description;
    product.images = photos;

    if (subcategory !== "null") {
      product.subcategory = subcategory;
    }

    if (brand !== undefined) {
      product.brand = brand;
    }

    if (model !== undefined) {
      product.model = model;
    }

    if (design !== undefined) {
      product.design = design;
    }

    if (carrier !== undefined) {
      product.carrier = carrier;
    }

    // if (tags !== "undefined") {
    //   product.tags = tags;
    // }


    const saveupdated = await product.save();
    // const updatedProduct = await saveupdated.populate("category").populate("subcategory").populate("brand").populate("carrier").populate("design").populate("model");
    const updatedProduct = await saveupdated.populate(["category", "subcategory", "brand", "carrier", "design", "model"]);
    res.json({
      message: "Product updated successfully",
      type: "success",
      updatedProduct
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deleteImages = product.images;
    deleteImages.forEach((image) => {
      const imageName = image.split("/")[5];
      fs.unlink(`uploads/images/${imageName}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });

    await product.remove();

    res.json({ message: "Product removed successfully", type: "success" });
  } else {
    res.json({ message: "Product not found", type: "warning" });
  }
});

// get products by user
const getProductsByUser = asyncHandler(async (req, res) => {
  const pageNo = parseInt(req.query.pageNo) || 1;
  const size = parseInt(req.query.pageSize) || 10;
  const query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1",
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  const products = await Product.find({ user: req.params.user }, {}, query).populate("category").populate("subcategory").populate("brand").populate("carrier").populate("design").populate("model");
  if (products) {
    res.json(products);
  } else {
    res.json({ message: "No products found for this user", type: "warning" });
  }
});


const updateproductimageurl = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    products.forEach(async (product) => {
      const images = product.images;
      const updatedImages = [];
      images.forEach((image) => {
        const updatedImage = image.replace("httpss", "https");
        updatedImages.push(updatedImage);
      });
      product.images = updatedImages;
      await product.save();
    });
    res.json({ message: "Product images updated successfully", type: "success" });
  } else {
    res.json({ message: "No products found", type: "warning" });
  }
});


var pastBrandFilter = [];
var pastDesignFilter = [];
var pastModelFilter = [];

const getFilteredProducts = asyncHandler(async (req, res) => {
  const { brand, model, design, limit, page } = req.query;

  const queryParameters = Object.keys(req.query);
  const lastQueryParam = queryParameters[queryParameters.length - 1];

  const brandArray = brand?.split(',');
  const modelArray = model?.split(',');
  const designArray = design?.split(',');

  try {
    const query = {};

    if (brandArray?.length > 0) {
      const brandDocuments = await Brand.find({ slug: { $in: brandArray } });

      if (brandDocuments.length > 0) {
        const brandIds = brandDocuments.map((brand) => brand._id);
        query.brand = { $in: brandIds };
      } else {
        return res.status(404).json({ error: 'Brand not found' });
      }
    }

    if (modelArray?.length > 0) {
      const modelDocuments = await Model.find({ slug: { $in: modelArray } });

      if (modelDocuments.length > 0) {
        const modelIds = modelDocuments.map((model) => model._id);
        query.model = { $in: modelIds };
      } else {
        return res.status(404).json({ error: 'Model not found' });
      }
    }

    if (designArray?.length > 0) {
      const designDocuments = await Design.find({ slug: { $in: designArray } });

      if (designDocuments.length > 0) {
        const designIds = designDocuments.map((design) => design._id);
        query.design = { $in: designIds };
      } else {
        return res.status(404).json({ error: 'Design not found' });
      }
    }

    const filteredProducts = await Product.find(query)
      .populate('brand')
      .populate('model')
      .populate('design');

    const brandCounts = await Product.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 },
        },
      },
    ]);

    const designCounts = await Product.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: '$design',
          count: { $sum: 1 },
        },
      },
    ]);

    const modelCounts = await Product.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: '$model',
          count: { $sum: 1 },
        },
      },
    ]);

    const allModelsCount = await Product.aggregate([
      {
        $group: {
          _id: '$model',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          model: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    const allDesignsCount = await Product.aggregate([
      {
        $group: {
          _id: '$design',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          design: '$_id',
          count: 1,
          _id: 0,
        },
      }
    ]);

    const allBrandsCount = await Product.aggregate([
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          brand: '$_id',
          count: 1,
          _id: 0,
        },
      }
    ]);

    const brandCountMap = new Map();
    brandCounts.forEach((item) => {
      const brandId = item?._id ? item?._id.toString() : null;
      const count = item.count;
      brandCountMap.set(brandId, count);
    });

    const designCountMap = new Map();
    designCounts.forEach((item) => {
      const designId = item?._id ? item?._id.toString() : null;
      const count = item.count;
      designCountMap.set(designId, count);
    });

    const modelCountMap = new Map();
    modelCounts.forEach((item) => {
      const modelId = item?._id ? item?._id.toString() : null;
      const count = item.count;
      modelCountMap.set(modelId, count);
    });

    const allModelsCountMap = new Map();
    allModelsCount.forEach((item) => {
      const modelId = item?.model ? item?.model.toString() : null;
      const count = item.count;
      allModelsCountMap.set(modelId, count);
    });

    const allDesignsCountMap = new Map();
    allDesignsCount.forEach((item) => {
      const designId = item?.design ? item?.design.toString() : null;
      const count = item.count;
      allDesignsCountMap.set(designId, count);
    });

    const allBrandsCountMap = new Map();
    allBrandsCount.forEach((item) => {
      const brandId = item?.brand ? item?.brand.toString() : null;
      const count = item.count;
      allBrandsCountMap.set(brandId, count);
    });




    let brandsWithCount = []
    if (lastQueryParam !== 'brand') {
      const brandDocuments = await Brand.find({});
      brandsWithCount = brandDocuments.map((brand) => ({
        _id: brand._id,
        name: brand.name,
        slug: brand.slug,
        count: brandCountMap.get(brand._id.toString()) || 0,
      }));
    } else {
      if (brandArray?.length > 0) {
        brandsWithCount = brandArray.map((brand) => ({
          _id: brand._id,
          name: brand.name,
          slug: brand.slug,
          count: allBrandsCountMap.get(brand._id.toString()) || 0,
        }));
      }
      else if (modelArray?.length > 0) {
        const modelDocuments = await Model.find({ slug: { $in: modelArray } });
        const modelIds = modelDocuments.map((model) => model._id);
        const brandDocuments = await Brand.find({ model: { $in: modelIds } });
        brandsWithCount = brandDocuments.map((brand) => ({
          _id: brand._id,
          name: brand.name,
          slug: brand.slug,
          count: allBrandsCountMap.get(brand._id.toString()) || 0,
        }));
      }
      else if (designArray?.length > 0) {
        const designDocuments = await Design.find({ slug: { $in: designArray } });
        const designIds = designDocuments.map((design) => design._id);
        const brandDocuments = await Brand.find({ design: { $in: designIds } });
        brandsWithCount = brandDocuments.map((brand) => ({
          _id: brand._id,
          name: brand.name,
          slug: brand.slug,
          count: allBrandsCountMap.get(brand._id.toString()) || 0,
        }));
      }
      else {
        brandsWithCount = await Brand.find({});
        brandsWithCount = brandsWithCount.map((brand) => ({
          _id: brand._id,
          name: brand.name,
          slug: brand.slug,
          count: allBrandsCountMap.get(brand._id.toString()) || 0,
        }));
      }
    }

    let designsWithCount = [];

    if (lastQueryParam !== 'design') {
      const designDocuments = await Design.find({});
      designsWithCount = designDocuments.map((design) => ({
        _id: design._id,
        name: design.name,
        slug: design.slug,
        count: designCountMap.get(design._id.toString()) || 0,
      }));
    }
    else {
      // const designs = await Design.find({});
      // designsWithCount = designs.map((design) => ({
      //   _id: design._id,
      //   name: design.name,
      //   slug: design.slug,
      //   count: allDesignsCountMap.get(design._id.toString()) || 0,
      // }));
      designsWithCount = pastDesignFilter;
    }
    let modelsWithCount = [];
    if (lastQueryParam !== 'model') {
      const modelDocuments = await Model.find({});
      modelsWithCount = modelDocuments.map((model) => ({
        _id: model._id,
        name: model.name,
        slug: model.slug,
        count: modelCountMap.get(model._id.toString()) || 0,
      }));
    } else {
      // const models = await Model.find({});
      // modelsWithCount = models.map((model) => ({
      //   _id: model._id,
      //   name: model.name,
      //   slug: model.slug,
      //   count: modelCountMap.get(model._id.toString()) || 0,
      // }));
      modelsWithCount = pastModelFilter;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 48;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < filteredProducts.length) {
      filteredProducts.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      filteredProducts.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    res.json({
      count: filteredProducts.length,
      products: filteredProducts.slice(startIndex, endIndex),
      brandsWithCount,
      designsWithCount,
      modelsWithCount,
    });

    pastBrandFilter = brandsWithCount;
    pastDesignFilter = designsWithCount;
    pastModelFilter = modelsWithCount;

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const importProducts = asyncHandler(async (req, res) => {
  try {
    let products = await req.body;

    products = products.map(async (product) => {
      const categorySlug = slugify(product.category, { lower: true });
      const subCategorySlug = slugify(product.subCategory, { lower: true });
      const brandSlug = slugify(product.brand, { lower: true });
      const modelSlug = slugify(product.model, { lower: true });
      const designSlug = slugify(product.design, { lower: true });
      const carrierSlug = slugify(product.carrier, { lower: true });

      const findCategory = await Category.findOne({ slug: categorySlug });
      const categoryID = findCategory._id;

      const findSubCategory = await SubCategory.findOne({ slug: subCategorySlug });
      const subCategoryID = findSubCategory._id;

      const findBrand = await Brand.findOne({ slug: brandSlug });
      const brandID = findBrand._id;

      const findModel = await Model.findOne({ slug: modelSlug });
      const modelID = findModel._id;

      const findDesign = await Design.findOne({ slug: designSlug });
      const designID = findDesign._id;

      const findCarrier = await Carrier.findOne({ slug: carrierSlug });
      const carrierID = findCarrier._id;

      return {
        name: product.name,
        slug: slugify(product.name, { lower: true }),
        category: categoryID,
        subCategory: subCategoryID,
        skuNumber: product.skuNumber,
        barCode: product.barCode,
        price: product.price,
        retailerPrice: product.retailerPrice,
        dropshipperPrice: product.dropshipperPrice,
        stock: product.stock,
        bestSeller: product.bestSeller,
        brand: brandID,
        model: modelID,
        design: designID,
        carrier: carrierID,
        weight: product.weight,
        discount: product.discount,
        description: product.description,
      }
    });

    products = await Promise.all(products);
    const result = await Product.updateMany({}, products);
    res.status(201).send({ message: 'Products imported successfully', result })
  } catch (err) {
    console.error(err);
    res.status(500).send(err)
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser,
  getProductsWithToken,
  getProductsforAdmin,
  updateproductimageurl,
  getFilteredProducts,
  importProducts
};