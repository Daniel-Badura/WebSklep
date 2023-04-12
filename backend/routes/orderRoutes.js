import express from "express";

const router = express.Router();
import { addOrderItems } from "../controllers/orderController.js";
import { authenticator } from "../middleware/authMiddleware.js";


// Default route
router.route('/').post(authenticator, addOrderItems);
// user ogin route


export default router;