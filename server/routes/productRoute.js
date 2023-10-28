import express from 'express';
const Router = express.Router();
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import productController from '../controllers/productController.js';

const storage = multer.diskStorage({
    destination: function (req, images, cb) {

        // Create a new product's images directory if it doesn't already exist
        const uploadPath = path.join('./uploads/' + req.body.name);
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
        console.log(req.body.images);
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
