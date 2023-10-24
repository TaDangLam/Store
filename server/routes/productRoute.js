import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const Router = express.Router();

import productController from '../controllers/productController.js';

import { Product } from '../model/productModel.js';

const storage = multer.diskStorage({
    destination: async function (req, images, cb) {

        const productName = req.body.name ;
        // When update, if there is a change in the product's name, rename the product's upload folder's name either
        if(req.params.id){
            const productID = req.params.id;
            const productDoc = await Product.findById(productID);
            if(req.body.name !== productDoc.name){
                const oldUploadPath = path.join('./uploads/' + productDoc.name);
                const newUploadPath = path.join('./uploads/' + productName);
                if (fs.existsSync(oldUploadPath)) {
                    fs.renameSync(oldUploadPath, newUploadPath);
                }
            }
        }

        // Create a new product's images directory if it doesn't already exist
        const uploadPath = path.join('./uploads/' + productName);
        if (!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath);
        }
        
        // Find all the images thats not included in the form-data and delete them
        req.body.images = req.body.images || [];
        const existingImages = fs.readdirSync(uploadPath);
        const imagesToDelete = existingImages.filter((image) => 
            !req.body.images.includes(image)
        );
        imagesToDelete.forEach((image) => {
            const imagePath = path.join(uploadPath, image);
            fs.unlinkSync(imagePath);
            console.log(`Deleted: ${image}`);
        });
        cb(null, './uploads/' + req.body.name);
    },
    filename: function (req, images, cb) {
        const filename = images.originalname;
        req.body.images.push(filename); 
        cb(null, filename);
    }
});
  
const upload = multer({ storage: storage });

Router.get('/', productController.getAllProduct);
Router.post('/', upload.any(), productController.addProduct);
Router.get('/search/:key', productController.searchProduct);
Router.get('/:id', productController.getProductDetail);
Router.patch('/:id', upload.any(), productController.updateProduct);
Router.delete('/:id', productController.deleteProduct);


export const API_Product = Router;
