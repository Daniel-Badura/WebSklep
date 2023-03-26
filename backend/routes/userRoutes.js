import express from "express";

const router = express.Router();
import { authUser, getUserProfile } from "../controllers/userController.js";
import { authenticator } from "../middleware/authMiddleware.js";


router.post('/login', authUser);
router.route('/profile').get(authenticator, getUserProfile);


export default router;