import express from "express";
import { getProducts, getProduct, deleteProduct, updateProduct, createProduct } from "../controllers/productController.js";
import { authenticator, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get(getProducts)
    .post(authenticator, isAdmin, createProduct);
router
    .route('/:id')
    .get(getProduct)
    .delete(authenticator, isAdmin, deleteProduct)
    .put(authenticator, isAdmin, updateProduct);



export default router;