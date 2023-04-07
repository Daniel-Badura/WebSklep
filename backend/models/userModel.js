import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    verificationCode: {
        type: String,
        required: false,
        default: false,
        createdAt: { type: Date, expires: '1d', default: Date.now }
    }
},
    {
        timestamps: true
    }
);

userSchema.methods.checkPassword = async function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
        console.log("Called Next".yellow);
    } else {
        console.log("Password Changed".yellow);
        this.password = bcrypt.hashSync(this.password, 10);
    }
});

const User = mongoose.model('User', userSchema);

export default User;