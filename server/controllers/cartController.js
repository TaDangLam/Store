    import { StatusCodes } from "http-status-codes";

    import { Cart } from '../model/cartModel.js'

    const cartController = {
        getCartUser: async(req, res) => {
            try {
                // lấy theo id user
                const userId = req.params.id;
                const cartData = await Cart.findOne({ orderBy: userId })
                .populate('items.productID')
                .exec();                  
            // Lấy theo id cart
            // const cartId = req.params.id;
            // const cartData = await Cart.findById(cartId);                   
                res.status(StatusCodes.ACCEPTED).json(cartData);
            } catch (err) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            }
        },

        getAllCart: async(req, res) => {
            try {
                const cartData = await Cart.find();
                res.status(StatusCodes.OK).json(cartData);
            } catch (err) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            }
        },
        
        addToCart: async(req, res) => {
            try {
                const { orderBy, items } = req.body;

                // Tìm giỏ hàng với ID từ người dùng
                let cart = await Cart.findOne({ orderBy });

                // Giỏ hàng tồn tại 
                if(cart) {
                    // kiểm tra thêm items vào giỏ hàng
                    items.map((item) => {
                        const existingItem = cart.items.find(i => i.productID.toString() === item.productID);
                        // nếu sản phẩm đã tồn tại trong giỏ
                        if(existingItem){
                            // existingItem biến đại diện cho người , item đại diện cho giỏ hàng có sẵn
                            if(parseInt(existingItem.amount) + parseInt(item.amount) <= 10){
                                existingItem.amount = parseInt(existingItem.amount) + parseInt(item.amount);
                                // nếu sản phẩm vượt quá mức 10 khi thêm vào giỏ hàng thì giữ ở mức 10
                            }else{
                                parseInt(existingItem.amount) = 10;
                            };
                        }else{
                            // Nếu sản phẩm chưa tồn tại => thêm vào
                            if(parseInt(item.amount) <= 10){
                                cart.items.push(item);
                            }
                        };
                        return item;
                    });

                    // Lưu giỏ hàng vừa cập nhật thêm số lượng hay gì đó vào database   
                    const saveCart = await cart.save();
                    if(saveCart){
                        return res.status(StatusCodes.OK).json(saveCart);
                    }
                // Giỏ hàng không tồn tại => tạo mới giỏ hàng
                }else{
                    const newCart = new Cart({
                        orderBy,
                        items,
                    });

                    // lưu giỏ vào database
                    const saveCart = await newCart.save();
                    if(saveCart){
                        return res.status(StatusCodes.OK).json(saveCart);
                    } 
                }

                
            } catch(err) {
                res.status(StatusCodes.BAD_REQUEST).json("Failed to add item to cart");
            }
        },

        updateCart: async(req, res) => {
            try {
                const cartID = req.params.id;    
                const update = req.body;

                // tìm giỏ hàng theo id cart
                const cart = await Cart.findById(cartID);

                if(!cart){
                return res.status(StatusCodes.NOT_FOUND).json('Cart not found');
                };

                // cập nhật items trong giỏ hàng
                if(update.items){
                    cart.items = update.items;
                };

                // lưu sau khi cập nhật
                const updateCart = await cart.save();
                return res.status(StatusCodes.OK).json(updateCart);
            } catch (err) {
                return res.status(StatusCodes.BAD_REQUEST).json(err);
            }
        },

        deleteProductFromCart: async(req, res) => {
            try {
                const cartID = req.params.id;
                const productId = req.params.productID;
                // Lấy id của user từ jwt
                const userID = req.user.id;
                console.log(req);
                console.log("------------------------------------------------------------------------------------------");
                console.log(req.user);
                console.log("------------------------------------------------------------------------------------------");
                console.log(req.user.id);

                // tìm giỏ hàng theo cartID
                const cart = await Cart.findById(cartID);

                if(!cart) {
                    return res.status(StatusCodes.NOT_FOUND).json("Cart Is Not Found");
                };
                // Lọc sản phẩm trong items
                cart.items = cart.items.filter((item) => item.productID.toString() !== productId);

                // kiểm tra cartID thuộc về user hiện tại
                if(cart.orderBy.toString() !== userID){
                    return res.status(StatusCodes.UNAUTHORIZED).json("You are not authorized to delete this product")
                }

                // lưu sản phẩm vừa lọc vào database
                const updateItem = await cart.save();
                return res.status(StatusCodes.OK).json("The product is successfully");
            } catch (err) {
                return res.status(StatusCodes.BAD_REQUEST).json(err);
            }
        }
    }

export default cartController;
