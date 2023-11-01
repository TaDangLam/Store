import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    properties: [{type: Object}],
    price: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number, 
        required: true,
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    images: [
        {type: String},
    ],
}, {
    timestamps: true
})

export const Product = mongoose.model('Product', productSchema);
