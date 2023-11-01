import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';

import { Product } from '../model/productModel.js';


const productController = {
    // GET ALL Product
    getAllProduct: async(req, res) => {
        try{
            const product = await Product.find()
            res.status(StatusCodes.OK).json(product);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Get Product By ID
    getProductDetail: async(req, res) => {
        try{
            const productID = req.params.id;
            const productDoc = await Product.findById(productID);
            res.status(StatusCodes.OK).json(productDoc);
        }catch (err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // Get Product By Category
    getProductByCategory: async(req, res) => {
        const categoryID = req.params.id;
        try {
            const data = await Product.find({ categories: categoryID});
            res.status(StatusCodes.OK).json(data);
        } catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Create Product
    addProduct: async(req, res) => {
        try {
            const {name, properties, price, amount, categories, images} = req.body;
            const productDoc = await Product.create({name, properties, price, amount, categories, images: images || []});
            res.status(StatusCodes.CREATED).json(productDoc);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Delete Product
    deleteProduct: async(req, res) => {
        const productID = req.params.id;
        try{
            const productDoc = await Product.findById(productID);
            const uploadPath = path.join('./public/uploads/' + productDoc.name);
            if (fs.existsSync(uploadPath)) {
                // If it exists, delete the folder
                fs.rmdirSync(uploadPath, { recursive: true }); // Use { recursive: true } to delete all files and subfolders within the folder
                await Product.findByIdAndDelete(productID);
                res.status(StatusCodes.OK).json("Product Delete Success");
            } else {
                res.status(StatusCodes.NOT_FOUND).json("Product not found in the upload folder");
            }
        }catch(err){
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Update Product
    updateProduct: async(req, res) => {
        const productID = req.params.id;
        const { name, properties, price, amount, images} = req.body;
        try {
            const productDoc = await Product.findByIdAndUpdate(productID, { name, properties, price, amount, images}, {new: true});
            res.status(StatusCodes.OK).json(productDoc);
        }catch(err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Search Product
    searchProduct: async(req, res) => {
        const searchTemp = req.params.key;
        try {
            const productData = await Product.find({
                $or: [
                    {name: {$regex: searchTemp, $options: 'i'}},
                    {description: {$regex: searchTemp, $options: 'i'}},
                ],
            });
            res.status(StatusCodes.OK).json(productData);
        }catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },
}

export default productController;
