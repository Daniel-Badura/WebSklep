import mongoose from 'mongoose';
import { transporter } from '../config/nodemailer.js';
import { setMailOptions } from '../data/mailOptions.js';
import dotenv from 'dotenv';
import User from './userModel.js';

dotenv.config();

const orderSchema = mongoose.Schema({
    orderNumber: {
        type: String,
        // unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    shippingAddress: {
        companyName: { type: String, required: false },
        vatNumber: { type: String, required: false },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    itemsPrice: {
        type: Number,
        required: false,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: false,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: false,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: false,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: false,
        default: false
    },
    paymentDate: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: false,
        default: false
    },
    deliveryDate: {
        type: Date
    }
},
    {
        timestamps: true
    }
);
orderSchema.pre('save', async function (next) {
    const order = this;
    const user = await User.findById(order.user);
    if (!order.orderNumber) {
        try {
            const count = await mongoose.model('Order').countDocuments();
            const orderNumber = ("BADUR" + String(count + 1).padStart(6, '0'));
            order.orderNumber = orderNumber;
            console.log(`created order ${orderNumber}`.green);
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: user.email,
                name: user.name,
                lastname: user.lastname,
                orderNumber: order.orderNumber,
                orderDate: order.createdAt,
                orderItems: order.orderItems,
                totalPrice: order.totalPrice,
            };

            const mail = setMailOptions(mailOptions);
            transporter.sendMail(mail, (error, info) => {
                if (error) {
                    console.error(error);
                    next(error);
                } else {
                    console.log(('Email sent:', info.response).green);
                    next();
                }
            });
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const Order = mongoose.model('Order', orderSchema);




export default Order;