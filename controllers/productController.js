const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Design = require("../models/Design");
const Model = require("../models/Model");
const Brand = require("../models/Brand")
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Carrier = require("../models/Carrier");
const User = require("../models/User");
const slugify = require("slugify");
const fs = require("fs")

// get all products
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 40;
  const { brand, carrier, category } = req.query;

  const startIndex = (page - 1) * limit;
  const productsfind = await Product.find({ status: "Published" }).skip(startIndex).limit(limit).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug")
  const products = productsfind.reverse()
  res.json(products);
});

const getProductsByQuery = asyncHandler(async (req, res) => {

  const { brand, carrier, category, page, model, limit, search } = req.query;
  const startIndex = (page - 1) * limit;


  if (brand) {
    const brandFind = await Brand.findOne({ slug: brand })
    const productsfind = await Product.find({ brand: brandFind._id, status: "Published" }).skip(startIndex).limit(limit).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug")
    res.json({ products: productsfind } || []);
  }
  if (carrier) {
    const carrierFind = await Carrier.findOne({ slug: carrier })
    const productsfind = await Product.find({ carrier: carrierFind._id, status: "Published" }).skip(startIndex).limit(limit).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug")
    res.json({ products: productsfind } || []);
  }
  if (category) {
    const categoryFind = await Category.findOne({ slug: category })
    const productsfind = await Product.find({ category: categoryFind._id, status: "Published" }).skip(startIndex).limit(limit).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug")
    res.json({ products: productsfind } || []);
  }
  if (model) {
    const modelFind = await Model.findOne({ slug: model })
    const productsfind = await Product.find({ model: modelFind._id, status: "Published" }).skip(startIndex).limit(limit).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug")
    res.json({ products: productsfind } || []);
  }
  if (!brand && !carrier && !category && !model) {
    const productsfind = await Product.find({ status: "Published" }).skip(startIndex).limit(limit).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug")
    res.json({ products: productsfind } || []);
  }
});



const getProductsforAdmin = asyncHandler(async (req, res) => {
  const productsfind = await Product.find({ status: "Published" }).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug");
  const products = productsfind.reverse();
  res.json(products);
});

const getProductsWithToken = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const startIndex = (page - 1) * limit;
  const user = req.user.id;
  const productsfind = await Product.find({ status: "Published" }).populate("category", "id _id name slug").populate("subcategory").populate("brand").populate("carrier").populate("design").populate("model");
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
    color,
    clearance,
    dropshipperDiscount,
    retailerDiscount,
    consumerDiscount,
    status,
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
    color,
    clearance,
    dropshipperDiscount,
    retailerDiscount,
    consumerDiscount,
    status,
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
    color,
    clearance,
    dropshipperDiscount,
    retailerDiscount,
    consumerDiscount,
    weight,
    description,
    status,
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
    product.color = color;
    product.clearance = clearance;
    product.dropshipperDiscount = dropshipperDiscount;
    product.retailerDiscount = retailerDiscount;
    product.consumerDiscount = consumerDiscount;
    product.description = description;
    product.status = status;
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

const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.status = status;
    const saveupdated = await product.save();
    const updatedProduct = await saveupdated.populate(["category", "subcategory", "brand", "carrier", "design", "model"]);
    res.json({
      message: "Product status updated successfully",
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
  const products = await Product.find({ user: req.params.user }, {}, query).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug");
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

const getFilteredProducts = asyncHandler(async (req, res) => {
  const { brand, model, design, limit, page } = req.query;

  const queryParameters = Object.keys(req.query);
  const lastQueryParam = queryParameters[queryParameters.length - 1];

  const brandArray = brand?.split(',');
  const modelArray = model?.split(',');
  const designArray = design?.split(',');


  try {
    const query = { status: "Published" };

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


    let previousQueryObject = req.query;
    delete previousQueryObject[lastQueryParam];

    if (previousQueryObject.brand) {
      const brandDocuments = await Brand.find({ slug: { $in: previousQueryObject.brand.split(',') } });
      if (brandDocuments.length > 0) {
        const brandIds = brandDocuments.map((brand) => brand._id);
        previousQueryObject.brand = { $in: brandIds };
      } else {
        return res.status(404).json({ error: 'Brand not found' });
      }
    }

    if (previousQueryObject.model) {
      const modelDocuments = await Model.find({ slug: { $in: previousQueryObject.model.split(',') } });
      if (modelDocuments.length > 0) {
        const modelIds = modelDocuments.map((model) => model._id);
        previousQueryObject.model = { $in: modelIds };
      } else {
        return res.status(404).json({ error: 'Model not found' });
      }
    }

    if (previousQueryObject.design) {
      const designDocuments = await Design.find({ slug: { $in: previousQueryObject.design.split(',') } });
      if (designDocuments.length > 0) {
        const designIds = designDocuments.map((design) => design._id);
        previousQueryObject.design = { $in: designIds };
      } else {
        return res.status(404).json({ error: 'Design not found' });
      }
    }




    let brandsWithCount = [];
    // if (lastQueryParam !== 'brand') {
    const brandDocuments = await Brand.find({});
    brandsWithCount = brandDocuments.map((brand) => ({
      _id: brand._id,
      name: brand.name,
      slug: brand.slug,
      count: brandCountMap.get(brand._id.toString()) || 0,
    }));
    // } 

    let designsWithCount = [];

    // if (lastQueryParam !== 'design') {
    const designDocuments = await Design.find({});
    designsWithCount = designDocuments.map((design) => ({
      _id: design._id,
      name: design.name,
      slug: design.slug,
      count: designCountMap.get(design._id.toString()) || 0,
    }));
    // }
    // else {
    //     const filteredDesigns = await Design.find(previousQueryObject);
    //     designsWithCount = filteredDesigns.map((design) => ({
    //         _id: design._id,
    //         name: design.name,
    //         slug: design.slug,
    //         count: designCountMap.get(design._id.toString()) || 0,
    //     }));

    // }
    let modelsWithCount = [];
    // if (lastQueryParam !== 'model') {
    const modelDocuments = await Model.find({});
    modelsWithCount = modelDocuments.map((model) => ({
      _id: model._id,
      name: model.name,
      slug: model.slug,
      count: modelCountMap.get(model._id.toString()) || 0,
    }));
    // } else {
    //     const filteredModels = await Model.find(previousQueryObject);
    //     modelsWithCount = filteredModels.map((model) => ({
    //         _id: model._id,
    //         name: model.name,
    //         slug: model.slug,
    //         count: modelCountMap.get(model._id.toString()) || 0,
    //     }));

    // }

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

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getAllProductsBySearch = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const products = await Product.find({ name: { $regex: search, $options: 'i' }, status: "Published" }).populate("category", "id name slug").populate("subcategory", "id name slug").populate("brand", "id name slug").populate("carrier", "id name slug").populate("design", "id name slug").populate("model", "id name slug");

  if (!products || products.length === 0) {
    return res.json({ message: "No products found", type: "warning" });
  }

  res.json(products);
});







const importProducts = asyncHandler(async (req, res) => {
  try {

    const file = req.file;
    let prod = [];

    if (!file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }
    else {
      const readFilePromise = () =>
        new Promise((resolve, reject) => {
          fs.readFile(file.path, 'utf8', function (err, data) {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(data);
            }
          });
        });

      const data = await readFilePromise(); // Wait for file reading to complete
      const lines = data.split('\n');
      const headers = lines[0].split(',');
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        prod.push(obj);
      }

    }

    // Prepare an array to store the update operations
    const updateOperations = [];

    for (const product of prod) {

      const id = product.Id;
      const name = product.Name;
      const category = product.Category;
      const subCategory = product.SubCategory;
      const skuNumber = product.SKUNumber;
      const barCode = product.BarCode;
      const price = product['Consumer Price'];
      const retailerPrice = product['Retailer Price'];
      const dropshipperPrice = product['Dropshipper Price'];
      const stock = product.Stock;
      const bestSeller = product['Best Seller'];
      const brand = product.Brand;
      const model = product.Model;
      const design = product.Design;
      const carrier = product.Carrier;
      const weight = product.Weight;
      // const description = product.Description;





      let categoryID = "";
      let subCategoryID = "";
      let brandID = "";
      let modelID = "";
      let designID = "";
      let carrierID = "";

      if (category !== "" && category !== undefined) {

        const categorySlug = slugify(category, { lower: true });
        const findCategory = await Category.findOne({ slug: categorySlug });

        if (findCategory !== null) {
          categoryID = findCategory._id;
        } else {
          const createCategory = await Category.create({ name: category, slug: slugify(category, { lower: true }) });
          categoryID = createCategory._id;
        }

      } else {
        categoryID = "";
      }


      if (subCategory !== "" && subCategory !== undefined) {

        const subCategorySlug = slugify(subCategory, { lower: true });
        const findSubCategory = await SubCategory.findOne({ slug: subCategorySlug });

        if (findSubCategory !== null) {
          subCategoryID = findSubCategory._id;
        } else {
          const createSubCategory = await SubCategory.create({ name: subCategory, slug: slugify(subCategory, { lower: true }), category: categoryID });
          subCategoryID = createSubCategory._id;
        }

      } else {
        subCategoryID = "";
      }


      if (brand !== "" && brand !== undefined) {

        const brandSlug = slugify(brand, { lower: true });
        const findbrand = await Brand.findOne({ slug: brandSlug });

        if (findbrand !== null) {
          brandID = findbrand._id;
        } else {
          const createbrand = await Brand.create({ name: brand, slug: slugify(brand, { lower: true }) });
          brandID = createbrand._id;
        }

      } else {
        brandID = "";
      }


      if (model !== "" && model !== undefined) {

        const modelSlug = slugify(model, { lower: true });
        const findModel = await Model.findOne({ slug: modelSlug });

        if (findModel !== null) {
          modelID = findModel._id;
        } else {
          const createModel = await Model.create({ name: model, slug: slugify(model, { lower: true }), brand: brandID });
          modelID = createModel._id;
        }

      } else {
        modelID = "";
      }


      if (design !== "" && design !== undefined) {

        const designSlug = slugify(design, { lower: true });
        const findDesign = await Design.findOne({ slug: designSlug });

        if (findDesign !== null) {
          designID = findDesign._id;
        } else {
          const createDesign = await Design.create({ name: design, slug: slugify(design, { lower: true }) });
          designID = createDesign._id;
        }

      } else {
        designID = "";
      }


      if (carrier !== "" && carrier !== undefined) {

        const carrierSlug = slugify(carrier, { lower: true });
        const findCarrier = await Carrier.findOne({ slug: carrierSlug });

        if (findCarrier !== null) {
          carrierID = findCarrier._id;
        } else {
          const createCarrier = await Carrier.create({ name: carrier, slug: slugify(carrier, { lower: true }) });
          carrierID = createCarrier._id;
        }

      } else {
        carrierID = "";
      }
      console.log(id, name);
      let updateOperation = {}
      if (!isNaN(id)) {
        updateOperation = {
          updateOne: {
            filter: { id: id },
            update: {
              $set: {
                name: name,
                slug: slugify(name, { lower: true }),
                category: categoryID,
                subCategory: subCategoryID,
                skuNumber: skuNumber,
                barCode: barCode,
                price: price,
                retailerPrice: retailerPrice,
                dropshipperPrice: dropshipperPrice,
                stock: stock,
                bestSeller: bestSeller,
                brand: brandID,
                model: modelID,
                design: designID,
                carrier: carrierID,
                weight: weight,
                // discount: discount,
                // description: description,
              },
            },
          },
        };
      }


      updateOperations.push(updateOperation);
    }

    // Perform the individual updates using bulkWrite with "updateOperations" array
    const result = await Product.bulkWrite(updateOperations);

    res.status(201).send({ message: 'Products imported successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


const getProductByClearance =

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
    importProducts,
    getProductsByQuery,
    getAllProductsBySearch,
    updateStatus
  };