import { StatusCodes } from 'http-status-codes';

import { Order } from '../model/orderModel.js';
import { Product } from '../model/productModel.js';
import { User } from "../model/userModel.js";

const orderController = {
    
    // GET ALL Order
    getAllOrder: async(req, res) => {
        try{
            const order = await Order.find()
            .populate('orderBy')
            .populate('items.productID');
            res.status(StatusCodes.OK).json(order);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //get order count
    countOrder: async (req, res) => {
        try {
            // Assuming you have a 'Product' model, use its 'countDocuments' method
            const orderCount = await Order.countDocuments();
    
            // Send the count as a response
            res.status(200).json({ count: orderCount });
        } catch (err) {
            // Handle errors
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
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
            const orderDoc = await Order.find({ orderBy: userID })
            .populate('orderBy')
            .populate('items.productID')
            .exec();
            res.status(StatusCodes.OK).json(orderDoc);
        }catch (err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    getOrderDetail: async(req, res) => {
        const orderId = req.params.orderId;
        // console.log("orderId: ", orderId);
        try {
            const order = await Order.findById(orderId)
                .populate('items.productID')
            if (!order) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
            }
            // console.log("order: ", order);
            
            const user = await User.findById(order.orderBy);
            // console.log("user: ", user);
            
            const orderDetail = {
                _id: order._id,
                totalPrice: order.totalPrice,
                status: order.status,
                createdAt: order.createdAt,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    province: user.province,
                    phone: user.phone,
                },
                items: order.items,
            };
            // console.log("orderDetail: ", orderDetail);
            res.status(StatusCodes.OK).json(orderDetail);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
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

    updateStatusOrder: async(req, res) => {
        const orderID = req.params.id;
        try {
            const order = await Order.findById(orderID);
            if (!order) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
            }
            order.status = 'Success';
            await order.save();
            res.status(StatusCodes.OK).json({ message: 'Order status updated to Success' });
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }
}

export default orderController;