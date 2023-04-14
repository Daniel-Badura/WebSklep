import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
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

orderSchema.pre('save', function (next) {
    const order = this;
    if (!order.orderNumber) {
        mongoose.model('Order').countDocuments().then(count => {
            order.orderNumber = ("BADUR" + String(count + 1).padStart(6, '0'));
            console.log(`created order ${order.orderNumber}`.green);
            next();
        }).catch(err => {
            next(err);
        });
    } else {
        next();
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;