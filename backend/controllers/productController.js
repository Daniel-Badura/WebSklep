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
// @route       Delete /api/products/:id
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
