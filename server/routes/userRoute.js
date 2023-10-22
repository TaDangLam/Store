import express from  'express';
const Router = express.Router();

import userController from '../controllers/userController.js';
import middlewareController from '../controllers/middlewareController.js';


Router.get('/', middlewareController.verifyTokenAdmin, userController.getAllUser);
Router.post('/register', userController.registerUser);
Router.post('/login', userController.loginUser);
Router.post('/logout', middlewareController.verifyToken, userController.logoutUser);
Router.post('/refresh', userController.requestRefreshToken);
Router.patch('/:id', middlewareController.verifyToken, userController.updateUser);
Router.delete('/:id', middlewareController.verifyTokenAdmin, userController.deleteUser);

export const API_User = Router;
