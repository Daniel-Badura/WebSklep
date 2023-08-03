import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc        Fetch all  products
// @route       GET /api/products
// @access      Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;

  const name = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const brand = req.query.keyword
    ? {
        brand: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const description = req.query.keyword
    ? {
        description: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const search = [
    { ...name },
    { ...brand },
    { ...description },
    { ...category },
  ];
  const count = await Product.countDocuments({
    $or: search,
  });
  const products = await Product.find({
    $or: search,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
    throw new Error("Product not found");
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
    throw new Error("Product not found");
  }
});

// @desc        Create product
// @route       POST /api/products/
// @access      Private
export const createProduct = asyncHandler(async (req, res) => {
  // const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = new Product({
    name: "New Item",
    price: 0,
    image: "image",
    user: req.user._id,
    category: "category",
    brand: "brand",
    countInStock: 0,
    description: "description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc        Update product
// @route       PUT /api/products/
// @access      Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    featured,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.featured = featured ? featured : false;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc        Create review
// @route       POST /api/products/:id/review
// @access      Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() == req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review successfully added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc        get top rated products
// @route       GET /api/products/top
// @access      Public
export const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.json(products);
});
// @desc        get featured products
// @route       GET /api/products/top
// @access      Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).sort({
    createdAt: -1,
  });
  res.json(products);
});
