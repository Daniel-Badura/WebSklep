import express from "express";

const router = express.Router();
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderDelivered, updateOrderPaid } from "../controllers/orderController.js";
import { authenticator, isAdmin } from "../middleware/authMiddleware.js";


// Default route

router.route('/').post(authenticator, addOrderItems);
router.route('/list').get(authenticator, isAdmin, getOrders);
router.route('/myorders').get(authenticator, getMyOrders);
router.route('/:id').get(authenticator, getOrderById);
router.route('/:id/pay').put(authenticator, updateOrderPaid);
router.route('/:id/deliver').put(authenticator, isAdmin, updateOrderDelivered);




export default router;