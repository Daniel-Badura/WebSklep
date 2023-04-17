import express from "express";

const router = express.Router();
import { authUser, putEmailVerification, getUserProfile, getUsers, registerUser, updateUserProfile, deleteUser } from "../controllers/userController.js";
import { authenticator, isAdmin } from "../middleware/authMiddleware.js";


// Default route
router.route('/').post(registerUser);
// user ogin route
router.post('/login', authUser);
// user profile route
router.route('/list').get(authenticator, isAdmin, getUsers);
router
    .route('/profile')
    .get(authenticator, getUserProfile)
    .put(authenticator, updateUserProfile);
router
    .route('/profile/verify')
    .put(authenticator, putEmailVerification);
router.route('/:id').delete(authenticator, isAdmin, deleteUser);
export default router;