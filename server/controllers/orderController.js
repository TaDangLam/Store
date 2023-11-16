import { StatusCodes } from 'http-status-codes';

import { Order } from '../model/orderModel.js';
import { Product } from '../model/productModel.js';

const orderController = {
    
    // GET ALL Order
    getAllOrder: async(req, res) => {
        try{
            const order = await Order.find();
            res.status(StatusCodes.OK).json(order);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },
    
    // GET ALL Shipped Order
    getAllShippedOrder: async(req, res) => {
        try{
            const order = await Order.find()
                .where('status').equals("Shipped");
            res.status(StatusCodes.OK).json(order);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // GET ALL Delivered Order
    getAllDeliveredOrder: async(req, res) => {
        try{
            const order = await Order.find()
                .where('status').equals("Delivered");
            res.status(StatusCodes.OK).json(order);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // GET ALL Cancelled Order
    getAllCancelledOrder: async(req, res) => {
        try{
            const order = await Order.find()
                .where('status').equals("Cancelled");
            res.status(StatusCodes.OK).json(order);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //  GET ALL Order contains UserID
    getUserOrder: async(req, res) => {
        try{
            const userID = req.params.userID;  
            const orderDoc = await Order.find()
                .where('userID').equals(userID)
            res.status(StatusCodes.OK).json(orderDoc);
        }catch (err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    updateProductQuantities: async (items) => {
        try{
            for (const item of items) {
                const product = await Product.findById(item.productID);
                console.log(product);
                //Kiểm tra nếu có đủ số lượng để giảm
                if (product.amount >= item.amount) {
                    product.amount -= item.amount;
                    await product.save();
                }else {
                    // Xử lý trường hợp không đủ số lượng trong kho
                    console.log(`Not enough stock for product ${product._id}`);
                }
            }
        }
        catch (err) {
            console.error('Error in updateProductQuantities:', err);
            throw err;
        }
    },
    // Create Order
    addOrder: async(req, res) => {
        try {
            const { orderBy, totalPrice,statusOrder, items } = req.body;
            // console.log('Before updateProductQuantities');
            await orderController.updateProductQuantities(items);
            // console.log('After updateProductQuantities');
            const orderDoc = await Order.create({
                orderBy, totalPrice, statusOrder, items: items || []
            });
            // console.log(orderDoc);
            res.status(StatusCodes.CREATED).json(orderDoc);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },


    // Delete Order
    deleteOrder: async(req, res) => {
        const orderID = req.params.id;
        try{
            await Order.findByIdAndDelete(orderID);
            res.status(StatusCodes.OK).json("Order Delete Success");
        }catch(err){
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // Update Order
    updateOrder: async(req, res) => {
        const orderID = req.params.id;
        try{
            const {userID, totalPrice, createDate, discount, itemTotalPrice, shippingFee, status, items} = req.body;
            await Order.findByIdAndUpdate(orderID,{
                userID: userID,
                totalPrice: totalPrice,
                itemTotalPrice: itemTotalPrice,
                createDate: createDate,
                discount: discount,
                shippingFee: shippingFee,
                status: status,
                items: items || []
            });
            res.status(StatusCodes.OK).json("Order Updated Success");
        }catch(err){
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },
}

export default orderController;