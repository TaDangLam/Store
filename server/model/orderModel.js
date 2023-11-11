import mongoose from "mongoose";

const orderStatusEnum = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const orderSchema = new mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    totalPrice: {
        type: Number, 
        required: true,
    },
    note: {
        type: String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    itemTotalPrice: {
        type: Number, 
        required: true,
    },
    // shippingFee: {
    //     type: Number, 
    //     required: true,
    // },
    status: {
        type: String,
        enum: orderStatusEnum,
        default: 'Pending',
    },
    items: [
        {
            productID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            amount: {type: Number, required: true, min: 1}, 
        }
    ],
    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    },
}, {
    timestamps: true
})

export const Order = mongoose.model('Order', orderSchema);
