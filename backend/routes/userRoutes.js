import express from "express";

const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userController.js";
import { authenticator } from "../middleware/authMiddleware.js";


// Default route
router.route('/').post(registerUser);
// user ogin route
router.post('/login', authUser);
// user profile route
router
    .route('/profile')
    .get(authenticator, getUserProfile)
    .put(authenticator, updateUserProfile);



export default router;