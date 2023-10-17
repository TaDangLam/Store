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
                email: req.body.email,
                password: hashed,
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
        try {
            const user = await User.findOne({ username: req.body.username });
            // check user in database
            if(!user){
                res.status(StatusCodes.NOT_FOUND).json("Username does not exist");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            // check validPassword
            if(!validPassword){
                res.status(StatusCodes.NOT_FOUND).json("Incorrect password");
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
                    expiresIn: "5m"
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
                console.log("refreshToken in Array: ", refreshTokenData);
                // lưu refreshToken bằng cookie
                res.cookie('refreshTokenCookie', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    samSite: "strict"
                });
                // lưu vào cookie thì khỏi trả về frontend
                // res.status(StatusCodes.ACCEPTED).json({user, accessToken, refreshToken});
                res.status(StatusCodes.ACCEPTED).json({user, accessToken});

            }
        } catch(err){
            res.status(StatusCodes.BAD_REQUEST).json(err);
        }
    },

    // Logout
    logoutUser: async(req, res) => {
        res.clearCookie("refreshToken");
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
            const userData = await User.find();
            res.status(StatusCodes.OK).json(userData);
        } catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    //delete User
    deleteUser: async(req, res) => {
        try {
            const userID = req.params.id;
            const userData = await User.findByIdAndDelete(userID);
            res.status(StatusCodes.OK).json("User is Deleted");
        } catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    },

    
}

export default userController;
