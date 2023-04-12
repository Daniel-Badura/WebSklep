import express from "express";

const router = express.Router();
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { authenticator } from "../middleware/authMiddleware.js";


// Default route
router.route('/').post(authenticator, addOrderItems);
router.route('/:id').get(authenticator, getOrderById);
// user ogin route


export default router;