'use client'
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoTrash } from "react-icons/go";

const Apicart = process.env.NEXT_PUBLIC_API_CART;
const ApiImage = process.env.NEXT_PUBLIC_API_STATIC_FILE;

const CartPage = () => {
    const router = useRouter();
    const { idUser } = useParams();
    const [cartData, setCartData] = useState(null);
    const [user, setUser] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [productPrice, setProductPrice] = useState({});
    const [total, setTotal] = useState(0);

    const getUserFromSessionStorage = () => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    };

    useEffect(() => {
        getUserFromSessionStorage();
    }, []);

    useEffect(() => {
        // Kiểm tra xem user.accessToken có sẵn trước khi thực hiện cuộc gọi API
        if (user && user.accessToken) {
            callApi();
        }
    }, [idUser, user?.accessToken]);

    useEffect(() => {
        caculateTotal()
    }, [quantities, productPrice])

    const callApi = () => {
        axios.get(Apicart + `/${idUser}`, {
            headers: {
                token: `Bearer ${user.accessToken}`
            },
        })
        .then(result => {
            const defaultQuantities = {};
            result.data.items.forEach(cartItem => {
                defaultQuantities[cartItem.productID._id] = 1;
            });
            setCartData(result.data);
            setQuantities(defaultQuantities);
            caculateTotal();
        })
        .catch(err => console.log(err))
    }

    const caculateTotal = () => {
        const sum = cartData?.items.reduce((total, cartItem) => {
            const quantity = quantities[cartItem.productID._id] || 0;
            const productSum = quantity * cartItem.productID.price;
            return total + productSum;
        }, 0)
        setTotal(sum);
    }

    const handleIncrementQuantity = (productID, productAmount, price) => {
        // get quantity product current
        const currentQuantity = quantities[productID] || 0;
        // console.log(price)
        // note quantities : {
        //     productID: cartAmount,
        //     productID: cartAmount,
        //     productID: cartAmount,
            
        // }
        if(currentQuantity < productAmount){
            const updateQuantity = currentQuantity + 1;
            setQuantities({...quantities, [productID]: updateQuantity});
            const productSum = updateQuantity * price;
            setProductPrice({...productPrice, [productID]: productSum})
        }
    }

    const handleDescrementQuantity = (productID, productAmount, price) => {
        // get quantity product current
        const currentQuantity = quantities[productID] || 0;
        console.log(productAmount)
        if(currentQuantity > 0){
            const updateQuantity = currentQuantity - 1;
            setQuantities({...quantities, [productID]: updateQuantity});
            const productSum = updateQuantity * price;
            setProductPrice({...productPrice, [productID]: productSum})
        }
    }

    const handleRemoveProduct = async(idProduct) => {
        try {
            await axios.delete(Apicart + `/${cartData._id}/${idProduct}`, {
                headers: {
                    token: `Bearer ${user.accessToken}`
                },
            });
            callApi();
        } catch (err) {
            console.log(err)
        }
    }

    const handlePay = async() => {
        try {
            const updateItem = cartData.items.map((item) => ({
                productID: item.productID._id,
                amount: quantities[item.productID._id] || 1,
            }));
            await axios.patch(Apicart + `/${idUser}`, updateItem, {
                headers: {
                    token: `Bearer ${user.accessToken}`
                },
            });
            router.push(`/checkout/${user.user._id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col py-5">
            <div className="text-2xl flex items-center w-full h-1/4 mb-4">Cart</div>
            <div className=" flex gap-2 w-full h-3/4">
                <div className="flex flex-col bg-white h-full w-9/12 px-4 py-1.5 rounded-lg">
                    <div className="flex border-y-2 items-center gap-16 w-full h-1/3"> 
                    {/* gap-x-20 */}
                        <div className="text-2xl font-semibold">Product</div>
                        <div className="text-2xl font-semibold">Description</div>
                        <div className="text-2xl font-semibold">Price</div>
                        <div className="text-2xl font-semibold">Quantity</div>
                        <div className="text-2xl font-semibold">Sum</div>
                        <div className="text-2xl font-semibold">Remove</div>
                    </div>
                    <div className="flex flex-col  h-2/3 w-full">
                        {cartData?.items.map(cart => (
                            <div className="flex items-center h-full gap-2 border-b-2  w-full">
                                <div className="w-1/6 h-full text-center"><img src={ApiImage + `/${cart.productID.name}/${cart.productID.images[0]}`} alt="image-product" /></div>
                                <div className="w-1/6 h-full text-center">{cart.productID.name}</div>
                                <div className="w-1/6 h-full text-center">{cart.productID.price}</div>
                                <div className="w-1/6 h-full text-center flex items-center">
                                    <button type="button" onClick={() => handleDescrementQuantity(cart.productID._id, cart.productID.amount, cart.productID.price)} className="w-1/3 bg-btn text-white p rounded-pd">-</button>
                                    <div className="w-1/3 ">{quantities[cart.productID._id] || 1}</div>
                                    <button type="button" onClick={() => handleIncrementQuantity(cart.productID._id, cart.productID.amount, cart.productID.price)} className="w-1/3 bg-btn text-white p rounded-pd">+</button>
                                </div>
                                <div className="w-1/6 h-full text-center">{productPrice[cart.productID._id] || cart.productID.price}</div>
                                <div className="w-1/6 h-full flex items-center px-10" onClick={() => handleRemoveProduct(cart.productID._id)}>
                                    <GoTrash className="p-5 h-16 w-16 cursor-pointer bg-slate-100 rounded-full hover:bg-red-500 hover:text-white"></GoTrash>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 bg-white h-full w-3/12 p-2.5 rounded-lg">
                    <div className="flex items-center w-full h-1/2 justify-between">
                        <div>Total:</div>
                        <div className="">{total}</div>
                    </div>
                    <div className="flex items-center gap-4 w-full h-1/2 justify-between ">
                        <Link href={'/'} className="text-signup-left outline outline-offset-2 outline-1 rounded-full p-1 w-3/5 text-center">
                            Continue Shopping
                        </Link>
                        <button onClick={handlePay} className="rounded-full py-1.5 w-2/5 bg-gradient-to-r from-signup-left to-signup-right text-white">Check Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
