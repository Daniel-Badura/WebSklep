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
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: String,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    }
);

userSchema.methods.checkPassword = async function (inputPassword) {
    return await bcrypt.compareSync(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;