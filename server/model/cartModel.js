import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [
        {
            productID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            amount: {type: Number, required: true, min: 1},
        }
    ],
}, {
    timestamps: true
})

export const Cart = mongoose.model('Cart', cartSchema);
