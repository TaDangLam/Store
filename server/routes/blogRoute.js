import express from 'express';
const Router = express.Router();
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import blogController from '../controllers/blogController.js';

const storage = multer.diskStorage({
    destination: function (req, images, cb) {

        // Create a new product's images directory if it doesn't already exist
        const uploadPath = path.join('./public/blogs/' + req.body.title);
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
        cb(null, './public/blogs/' + req.body.title);
    },
    filename: function (req, images, cb) {
        const filename = images.originalname;
        req.body.images?.push(filename); 
        console.log(req.body.images);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

Router.get('/', blogController.getAllBlog);
Router.post('/', upload.any(), blogController.addBlog);
Router.get('/:id', blogController.getIdBlog);
Router.patch('/:id', upload.any(), blogController.updateBlog);
Router.delete('/:id', blogController.deleteBlog);

export const API_Blog = Router;
