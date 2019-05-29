import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
    location: String,
    tourTitle: String,
    tourCategory: String,
    tourDescription: String,
    price: Number,
    currency: String,
    img: [String],
    reviews: [
        {
            reviewTitle: String,
            reviewLongText: String,
            stars: Number
        }
    ]
});

export const Tour = mongoose.model('Tour', tourSchema);
