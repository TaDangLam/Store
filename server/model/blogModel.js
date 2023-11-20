import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    images: [{type: String}],
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export const Blog = mongoose.model('Blog', blogSchema);
