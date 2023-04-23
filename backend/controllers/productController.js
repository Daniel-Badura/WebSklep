import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js';

// @desc        Fetch all  products
// @route       GET /api/products
// @access      Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
});

// @desc        Fetch single products
// @route       GET /api/products/:id
// @access      Public
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc        Delete product
// @route       DELETE /api/products/:id
// @access      Private
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (product) {
        res.json("Product removed");
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc        Create product
// @route       POST /api/products/
// @access      Private
export const createProduct = asyncHandler(async (req, res) => {
    // const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = new Product({
        name: 'New Item',
        price: 0,
        image: 'image',
        user: req.user._id,
        category: 'category',
        brand: 'brand',
        countInStock: 0,
        description: 'description',
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc        Update product
// @route       PUT /api/products/
// @access      Private
export const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});