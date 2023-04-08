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
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: token(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
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
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc        Post new user
// @route       POST /api/users
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {

    const { name, lastname, password, email, phone, isAdmin } = req.body;
    const checkUser = await User.findOne({ email });
    const verificationCode = Math.random().toString(36).substring(2, 8);

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
        verificationCode,

    });
    if (user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: token(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        if (await user.checkPassword(req.body.password)) {
            console.log("Password Confirmed".green);
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.lastname = req.body.lastname || user.lastname;
            user.phone = req.body.phone || user.phone;
            if (req.body.newPassword) {
                user.password = req.body.newPassword;
            }

        } else { throw new Error('Password incorrect'); }
        const userUpdated = await user.save();
        res.json({
            _id: userUpdated._id,
            name: userUpdated.name,
            lastname: userUpdated.lastname,
            email: userUpdated.email,
            phone: userUpdated.phone,
            token: token(userUpdated._id),
        });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export const getEmailVerification = asyncHandler(async (req, res) => {
    const verificationCode = req.body.verificationCode;
    const user = await User.findById(req.user._id);

    if (user) {
        if (verificationCode === user.verificationCode) {
            user.isVerified = true;
            const userUpdated = await user.save();
            res.json({
                _id: userUpdated._id,
                name: userUpdated.name,
                lastname: userUpdated.lastname,
                email: userUpdated.email,
                phone: userUpdated.phone,
                isVerified: userUpdated.isVerified,
                token: token(userUpdated._id),
            });
        }
        else {

            res.status(404);
            throw new Error('Incorrect Verification Code ');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});