import express from 'express';

const Router = express.Router();

import { ProductImage } from '../model/product_imageModel.js';
import product_imageController from '../controllers/product_imageController.js';




  

  
Router.get('/', product_imageController.getAllProductImage);

Router.post('/upload', (req, res) => {      
      upload(req, res, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.url = req.file.path;
            console.log(req.body);
            const productImg = new ProductImage(req.body);
            productImg.save();
            res.status(200).send('File uploaded successfully.');
        }
      });
    });

export const API_ProductImage = Router;