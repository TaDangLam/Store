import path from 'path';
import fs from 'fs';
import { StatusCodes } from "http-status-codes";

import { Blog } from "../model/blogModel.js";

const blogController = {
    //Get All Blog
    getAllBlog: async(req, res) => {
        try {
            const blogData = await Blog.find();
            res.status(StatusCodes.OK).json(blogData);
        } catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Get Blog for id
    getIdBlog: async(req, res) => {
        const blogID = req.params.id;
        try {
           const BlogData = await Blog.findById(blogID);
           res.status(StatusCodes.OK).json(BlogData);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Create Blog
    addBlog: async(req, res) => {
        try {
            const { title, images, content } = req.body;
            const blogData = await Blog.create({ title, images: images || [], content });
            res.status(StatusCodes.CREATED).json(blogData);
        } catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //Delete Blog
    deleteBlog: async(req, res) => {
        const blogID = req.params.id;
        try {
            const blogDoc = await Blog.findById(blogID);
            const uploadPath = path.join('./public/blogs/' + blogDoc.title);
            if (fs.existsSync(uploadPath)) {
                // If it exists, delete the folder
                fs.rmdirSync(uploadPath, { recursive: true });
                await Blog.findByIdAndDelete(blogID);
                res.status(StatusCodes.OK).json("Blog Delete Success");
            } else {
                res.status(StatusCodes.NOT_FOUND).json("Blog not found in the upload folder");
            }
        } catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //update Blog
    updateBlog: async(req, res) => {
        const blogID = req.params.id;
        const { title, images, content } = req.body;
        try {
            const BlogData = await Blog.findByIdAndUpdate(blogID, { title, images, content });
            res.status(StatusCodes.OK).json(BlogData);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },
}

export default blogController;
