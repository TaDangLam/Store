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
                // get information from req.body
                const { orderBy, items } = req.body;
                const cart = await Cart.findOne({ orderBy });
                // console.log("Cart: ", cart)
                if(cart){
                    items.map((item) => {
                        const existItem = cart.items?.find(i => i.productID.toString() === item.productID);
                        // console.log("existItem: ", existItem);
                        if(existItem){
                            existItem.amount += item.amount;
                        }else{
                            cart.items.push(item);
                        }
                    });
                    
                    // save update to database
                    const updateCart = await cart.save();
                    
                    return res.status(StatusCodes.OK).json(updateCart);
                }else{
                    const cartNew = new Cart({
                        orderBy: orderBy,
                        items: items,
                    });
                    const savedCart = await cartNew.save();
                    return res.status(StatusCodes.CREATED).json(savedCart);
                }
            } catch (err) {
                console.log(err)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
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
                // const userID = req.user.id;
                // console.log(req);
                // console.log("------------------------------------------------------------------------------------------");
                // console.log(req.user);
                // console.log("------------------------------------------------------------------------------------------");
                // console.log(req.user.id);

                // tìm giỏ hàng theo cartID
                const cart = await Cart.findById(cartID);

                if(!cart) {
                    return res.status(StatusCodes.NOT_FOUND).json("Cart Is Not Found");
                };
                // Lọc sản phẩm trong items
                cart.items = cart.items.filter((item) => item.productID.toString() !== productId);

                // kiểm tra cartID thuộc về user hiện tại
                // if(cart.orderBy.toString() !== userID){
                //     return res.status(StatusCodes.UNAUTHORIZED).json("You are not authorized to delete this product")
                // }

                // lưu sản phẩm vừa lọc vào database
                const updateItem = await cart.save();
                return res.status(StatusCodes.OK).json("The product is successfully");
            } catch (err) {
                return res.status(StatusCodes.BAD_REQUEST).json(err);
            }
        }
    }

export default cartController;
