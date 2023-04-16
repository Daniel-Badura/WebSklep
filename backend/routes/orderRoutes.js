import express from "express";

const router = express.Router();
import { addOrderItems, getMyOrders, getOrderById, updateOrderPaid } from "../controllers/orderController.js";
import { authenticator } from "../middleware/authMiddleware.js";


// Default route

router.route('/').post(authenticator, addOrderItems);
router.route('/myorders').get(authenticator, getMyOrders);
router.route('/:id').get(authenticator, getOrderById);
router.route('/:id/pay').put(authenticator, updateOrderPaid);


export default router;