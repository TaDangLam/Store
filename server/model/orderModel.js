import mongoose from "mongoose";

const orderStatusEnum = ['Processing', 'Cancelled'];

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
    items: [
        {
            _id: false,
            productID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            amount: {type: Number},
        }
    ],
    // items: [
    //     {
    //         _id: false,
    //         productID: String,
    //         amount: Number
    //     }
    // ],
    // itemTotalPrice: {
    //     type: Number, 
    //     required: true,
    // },
    status: {
        type: String,
        enum: orderStatusEnum,
        default: 'Processing',
    },

    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    },
}, {
    timestamps: true
})

export const Order = mongoose.model('Order', orderSchema);
