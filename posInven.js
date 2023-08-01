const express = require('express');
const addCategory = require('./models/Category');
const Product = require('./models/Product');
const axios = require('axios');
const router = express.Router();
const slugify = require('slugify');


router.get('/', async (req, res) => {
    try {
        let start = 1;
        let maxResults = 200;
        let totalCnt = 0;
        let insertedCount = 0;
        let updatedCount = 0;

        do {
            try {
                const response = await axios.get(
                    `https://api.sosinventory.com/api/v2/item?start=${start}&maxresults=${maxResults}`,
                    {
                        headers: {
                            Host: 'api.sosinventory.com',
                            Authorization: 'Bearer 6Z66In1uAQnmnU4embFJSiaZRSnuRzETw-1xeI8H2Hw6miU2Bv1hHLsT6urKCU81jmI37RxN4cWC3hzUyADQGA1LRZnhr2GODgv9iF5UJjvHPatgW-3ChVWrm0UxaTiJ8NMSCaI0VH1fDuyxrHnpUsXPQd-WfXsIImm_Y-WfRqikiwOjMTWe5U644UhWCMSkLoP_plePSgqbKNxLaTiDyphsstisRmDgRCjB0uGb0WfiZidd4_OdQILAC12IyOjHS0MZkyM7kh0ozzyEcxOIV9Iv5_LHfnYlceAKNX0azkwplAfU'
                        },
                    }
                );

                const { count, totalCount, data } = response.data;
                totalCnt = totalCount;
                const productArr = [];

                const categoryMap = new Map();
                // Loop through each product in the response and insert/update it in MongoDB
                for (const productData of data) {


                    const { id, name, description, category, onhand, costBasis } = productData;

                    let Category;
                    let categoryId;
                    let barCode = productData.id;

                    if (category !== null) {
                        Category = category.name;
                    } else {
                        Category = 'Uncategorized';
                    }

                    if (!categoryMap.has(category)) {
                        const categoryName = Category || 'Uncategorized';

                        const categorySlug = categoryName !== null
                            ? slugify(categoryName, { lower: true, remove: /[*+~.()'"!:@]/g })
                            : 'uncategorized';

                        const existingCategory = await addCategory.findOne({ name: categoryName }).exec();

                        if (existingCategory) {
                            categoryId = existingCategory._id;
                        } else {
                            const category = new addCategory({
                                name: categoryName,
                                slug: categorySlug,
                            });
                            await category.save();
                            categoryId = category._id;
                        }

                        categoryMap.set(Category, { categoryId });
                    } else {
                        const categoryData = categoryMap.get(Category);
                        categoryId = categoryData.categoryId;
                    }

                    const productName = String(productData.name);
                    let slug = slugify(productName, {
                        lower: true,
                    });
                    slug = slug + '-' + productData.id;


                    // Check if the product already exists in MongoDB
                    const productID = productData.id;
                    const existingProduct = await Product.findOne({ productID });

                    if (existingProduct) {
                        // Product exists, update its details
                        const updatedProduct = await Product.updateOne({ productID },
                            {
                                name: productData.name,
                                slug: slug,
                                description: productData.description,
                                category: categoryId,
                                price: productData.costBasis,
                                stock: productData.onhand,
                                barCode,
                                images: ['https://remax-six.vercel.app/assets/img/RemaxWirelessPlaceHolderImage.png']
                            });
                        updatedCount++;
                        productArr.push(updatedProduct);
                    } else {
                        // Product does not exist, create a new product
                        const insertedProduct = await Product.create({
                            productID: productData.id,
                            name: productData.name,
                            slug: slug,
                            description: productData.description,
                            category: categoryId,
                            price: productData.costBasis,
                            stock: productData.onhand,
                            barCode,
                            images: ['https://remax-six.vercel.app/assets/img/RemaxWirelessPlaceHolderImage.png']
                        });
                        insertedCount++;
                        productArr.push(insertedProduct)
                    }
                }

                start += maxResults;
                console.log('Fetched inventory:', start, totalCount);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        } while (start <= totalCnt);
        console.log('Inventory fetch complete!');
        console.log('Inserted products:', insertedCount);
        console.log('Updated products:', updatedCount);
        res.json({ message: 'Inventory fetch complete!', productArr });
    } catch (err) {
        res.json({ message: err });
    }
}
);

module.exports = router;