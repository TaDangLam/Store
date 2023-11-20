import express from 'express';
const Router = express.Router();

import categoryController from '../controllers/categoryController.js';
import middlewareController from '../controllers/middlewareController.js';

Router.get('/', categoryController.getAllCategory);
Router.post('/', middlewareController.verifyTokenAdmin, categoryController.addCategory);
Router.get('/:id', categoryController.getCategoryById);
Router.patch('/:id', middlewareController.verifyTokenAdmin, categoryController.updateCategory);
Router.delete('/:id', middlewareController.verifyTokenAdmin, categoryController.deleteCategory);

export const API_Category = Router;
