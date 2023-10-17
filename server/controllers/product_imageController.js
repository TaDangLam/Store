import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { StatusCodes } from 'http-status-codes';

import { ProductImage } from '../model/product_imageModel.js';

const storage = multer.diskStorage({
  destination: function (req, url, cb) {
    const uploadPath = path.join('./uploads/' + req.body.productID);
    if (!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath);
    }
    cb(null, './uploads/' + req.body.productID);
  },
  filename: function (req, url, cb) {
    cb(null, Date.now() +  '_' + url.originalname );
  }
});

const upload = multer({ storage: storage }).single('url');

const productImageController = {
    
    getAllProductImage: async(req, res) => {
        try{
            const productImage = await ProductImage.find();
            res.status(StatusCodes.OK).json(productImage);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },
    // Import product image
    importProductImage: async(req, res) =>{
        try {
            const {productID, url} = req.body;
            const productImage = await ProductImage.create({productID, url});
            res.status(StatusCodes.CREATED).json(productImage);
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }
} 

export default productImageController;