import mongoose from 'mongoose';

export const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
);


export const Review = mongoose.model('Review', reviewSchema);