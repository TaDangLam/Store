import express from 'express';
const Router = express.Router();

import cartController from '../controllers/cartController.js';
import middlewareController from '../controllers/middlewareController.js';


Router.get('/', middlewareController.verifyTokenAdmin, cartController.getAllCart)
Router.post('/', middlewareController.verifyToken, cartController.addToCart);
Router.get('/:id', middlewareController.verifyToken, cartController.getCartUser);
Router.patch('/:id', middlewareController.verifyToken, cartController.updateCart);
Router.delete('/:id/:productID', middlewareController.verifyToken, cartController.deleteProductFromCart);

export const API_Cart = Router;
