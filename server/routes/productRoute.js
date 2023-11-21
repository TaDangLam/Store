import express from 'express';
const Router = express.Router();
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
                const oldUploadPath = path.join('./public/uploads/' + productDoc.name);
                const newUploadPath = path.join('./public/uploads/' + productName);
                if (fs.existsSync(oldUploadPath)) {
                    fs.renameSync(oldUploadPath, newUploadPath);
                }
            }
        }

        // Create a new product's images directory if it doesn't already exist
        const uploadPath = path.join('./public/uploads/' + productName);
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
        cb(null, './public/uploads/' + req.body.name);
    },
    filename: function (req, images, cb) {
        const filename = images.originalname;
        req.body.images.push(filename); 
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

Router.get('/', productController.getAllProduct);
Router.get('/count', productController.countProducts);
Router.post('/', upload.any(), productController.addProduct);
// Router.get('/search/:key', productController.searchProduct);
Router.get('/search', productController.searchProduct);
Router.get('/:id', productController.getProductDetail);
Router.get('/category/:id', productController.getProductByCategory)
Router.patch('/:id', upload.any(), productController.updateProduct);
Router.delete('/:id', productController.deleteProduct);
Router.get('/home/:categoryId', productController.getNewestProductsByCategory);

export const API_Product = Router;
