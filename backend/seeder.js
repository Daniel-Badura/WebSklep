import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);

        // console.log('Admin user:'.green.inverse + adminUser);
        console.log('Data successfully imported!'.green.inverse);
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    };
};

const removeData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data successfully removed!'.red.inverse);
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    };
};

if (process.argv[2] === '-d') {
    removeData();
} else {
    importData();
}