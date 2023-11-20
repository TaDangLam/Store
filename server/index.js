import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import MongoConnect from './lib/mongodb.js';
import { API_Product } from './routes/productRoute.js';
import { API_Category } from './routes/categoryRoute.js';
import { API_Blog } from './routes/blogRoute.js';
import { API_User } from './routes/userRoute.js';
import { API_Order } from './routes/orderRoute.js';
import { API_Cart } from './routes/cartRoute.js';


dotenv.config()
const PORT = process.env.PORT || 4000;

// Database Connection
MongoConnect();

// Middleware
app.use(cors());    
app.use(express.json())
app.use(cookieParser());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Router
app.use('/api/product', API_Product),
app.use('/api/category', API_Category);
app.use('/api/blog', API_Blog);
app.use('/api/order', API_Order),
app.use('/api/user', API_User);
app.use('/api/cart', API_Cart);


app.listen(PORT, () => console.log(`Server listening http://localhost:${PORT}`));
