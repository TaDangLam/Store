import express from 'express';
const Router = express.Router();

import orderController from '../controllers/orderController.js';
import middlewareController from '../controllers/middlewareController.js';


Router.get('/', middlewareController.verifyTokenAdmin, orderController.getAllOrder);
Router.post('/', orderController.addOrder);
Router.get('/shipped', orderController.getAllShippedOrder);
Router.get('/delivered', orderController.getAllDeliveredOrder);
Router.get('/cancelled', orderController.getAllCancelledOrder);
Router.delete('/delete/:id', orderController.deleteOrder);
Router.patch('/update/:id', orderController.updateOrder);
Router.get('/:userID', orderController.getUserOrder);
Router.get('/order-detail/:orderId', orderController.getOrderDetail);

export const API_Order = Router;
