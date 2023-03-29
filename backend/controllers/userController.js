import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import token from "../utils/token.js";

// @desc        Authenticate user and get the token
// @route       POST /api/users/login
// @access      Public
export const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.checkPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});


// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
    res.send("good");
});

// @desc        Post new user
// @route       POST /api/users
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {

    const { email, password, name, lastname, phone, isAdmin } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        lastname,
        email,
        password,
        phone,
        isAdmin,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});