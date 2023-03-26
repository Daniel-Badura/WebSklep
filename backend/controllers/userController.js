import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';

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
            token: null
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password' + " username " + await User.findOne({ email }));
    }
});