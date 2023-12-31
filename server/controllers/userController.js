import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { User } from "../model/userModel.js";

let refreshTokenData = [];

const userController = {
    // Register User
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // create new user in database
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                name: req.body.name,
                address: req.body.address,
                province: req.body.province,
                phone: req.body.phone,
            });

            // save to DB
            const user = await newUser.save();
            return res.status(StatusCodes.CREATED).json(user);
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // Login
    loginUser: async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // console.log(req.body.password);
        try {
            const user = await User.findOne({ username });
            // check user in database
            if(!user){
               return res.status(StatusCodes.NOT_FOUND).json("Username does not exist");
            }
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            // check validPassword
            if(!validPassword){
                return res.status(StatusCodes.NOT_FOUND).json("Incorrect password");
            }

            // check user and validPassword
            if(user && validPassword){
                // sign(Payload kiểu  object, secrect, option)
                const accessToken = jwt.sign({
                    id: user.id,
                    role: user.role
                },
                    process.env.JWT_ACCESS_KEY,
                {
                    expiresIn: "1d"
                });

                // refreshToken
                const refreshToken = jwt.sign({
                    id: user.id,
                    role: user.role
                },
                    process.env.JWT_REFRESH_KEY,
                {
                    expiresIn: "365d"
                });

                // Cùng lúc đó lưu refreshToken vừa tạo sau khi login vào refreshTokenData[]
                refreshTokenData.push(refreshToken);
                if(user.role === 'admin'){
                    res.clearCookie('refreshTokenCookie');
                    return res.status(StatusCodes.ACCEPTED).json({user, accessToken, role: 'admin'});
                } else if (user.role === 'staff'){
                    res.clearCookie('refreshTokenCookie');
                    return res.status(StatusCodes.ACCEPTED).json({user, accessToken, role: 'staff'});
                }else {
                    res.cookie('refreshTokenCookie', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        samSite: "strict"
                    });
                    return res.status(StatusCodes.ACCEPTED).json({ user, accessToken, role: "customer" });
                }
            }
        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(err);
        }
    },

    // Logout
    logoutUser: async(req, res) => {
        res.clearCookie("refreshTokenCookie");
        res.status(StatusCodes.OK).json("Logout successful");
    },

    //requestRefreshToken
    requestRefreshToken: async(req, res) => {
        const refreshToken = req.cookies.refreshTokenCookie;
        // Check refreshToken in Cookie
        if(!refreshToken){
            return res.status(StatusCodes.UNAUTHORIZED).json('You are not authenticated');
        };
        // Check refreshToken in refreshTokenData[]
        if(!refreshTokenData.includes(refreshToken)){
            return res.status(StatusCodes.FORBIDDEN).json('Refresh Token is not valid');
        };
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err) {
                console.log(err);
            }

            refreshTokenData = refreshTokenData.filter((token) => token !== refreshToken);
            
            // Create new accessToken, refreshToken
            const newAccessToken = jwt.sign({
                id: user.id,
                role: user.role
            },
                process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "1m"
            });

            // ----------newRefreshToken-------------
            const newRefreshToken = jwt.sign({
                id: user.id,
                role: user.role
            },
                process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "365d"
            });

            //
            refreshTokenData.push(newRefreshToken);
            console.log(refreshTokenData);
            res.clearCookie("refreshTokenCookie");
            // Save both in cookie
            res.cookie("newRefreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                samSite: "strict"
            });
            return res.status(StatusCodes.OK).json({accestoken: newAccessToken});
        })
    },
    
    //Get All User
    getAllUser: async(req, res) => {
        try {
            const userData = await User.find({ role: 'customer' });
            res.status(StatusCodes.OK).json(userData);
        } catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },
    //get Count User
    countUser: async (req, res) => {
        try {
            // Assuming you have a 'Product' model, use its 'countDocuments' method
            const userCount = await User.countDocuments()
                                        .where('role').equals('customer');
            // Send the count as a response
            res.status(200).json({ count: userCount });
        } catch (err) {
            // Handle errors
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    //get User By Id
    getUserById: async(req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            res.status(StatusCodes.OK).json(user);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //delete User
    deleteUser: async(req, res) => {
        try {
            const userID = req.params.id;
            await User.findByIdAndDelete(userID);
            res.status(StatusCodes.OK).json("User is Deleted");
        } catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //update user
    updateUser: async(req, res) => {
        const { name, email, address, username, password, phone, province, id } = req.body;
        // const userID = req.params.id;
        try {
            let updatedData = { name, email, username, address, phone, province };
            if(password) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                updatedData.password = hashed;
            }
            const userData = await User.findByIdAndUpdate(id, updatedData, {new: true});
            return res.status(StatusCodes.OK).json(userData);
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }
}

export default userController;
