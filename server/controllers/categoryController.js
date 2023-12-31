import { StatusCodes } from 'http-status-codes';

import { Category } from '../model/categoryModel.js';

const categoryController = {
    //Get All Category
    getAllCategory: async(req, res) => {
        try {
            const CategoryDoc = await Category.find();
            res.status(StatusCodes.OK).json(CategoryDoc);
        }catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Get Category by id
    getCategoryById: async(req, res) => {
        try {
            const categoryID = req.params.id;
            const data = await Category.findById(categoryID);
            res.status(StatusCodes.OK).json(data);
        } catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Create Category
    addCategory: async(req, res) => {
        const { name } = req.body;
        try {
            const CategoryDoc = await Category.create({
                name
            });
            res.status(StatusCodes.CREATED).json(CategoryDoc);
        }catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Update Category
    updateCategory: async(req, res) => {
        const categoryID = req.params.id;
        const { name } = req.body;
        try {
            const categoryDoc = await Category.findByIdAndUpdate(categoryID, { name }, {new: true});
            res.status(StatusCodes.OK).json(categoryDoc);
        } catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Delete Category
    deleteCategory: async(req, res) => {
        const productID = req.params.id;
        try {
            await Category.findByIdAndDelete(productID);
            res.status(StatusCodes.OK).json('Category was Deleted');
        } catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }  
    }
}

export default categoryController;
