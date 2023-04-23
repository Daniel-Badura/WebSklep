import express from "express";
import { getProducts, getProduct, deleteProduct } from "../controllers/productController.js";
import { authenticator, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProduct)
    .delete(authenticator, isAdmin, deleteProduct);


export default router;