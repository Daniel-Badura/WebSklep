import express from "express";

const router = express.Router();
import { addOrderItems, getOrderById, updateOrderPaid } from "../controllers/orderController.js";
import { authenticator } from "../middleware/authMiddleware.js";


// Default route
router.route('/').post(authenticator, addOrderItems);
router.route('/:id').get(authenticator, getOrderById);
router.route('/:id/pay').get(authenticator, updateOrderPaid);
// user ogin route


export default router;