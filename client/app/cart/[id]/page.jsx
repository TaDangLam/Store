'use client'
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Apicart = process.env.NEXT_PUBLIC_API_CART;
const ApiImage = process.env.NEXT_PUBLIC_API_STATIC_FILE;

const CartPage = () => {
    const router = useRouter();
    const { id } = useParams();
    // const [product, setProduct] = useState(null);
    const [cartData, setCartData] = useState(null);
    const [user, setUser] = useState(null);
    
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
            axios.get(Apicart + `/${id}`, {
                    headers: {
                        token: `Bearer ${user.accessToken}`
                    },
                })
                .then(result => setCartData(result.data))
                .catch(err => console.log(err))
        }
    }, [id, user?.accessToken]);
    console.log(cartData);
    return (
        <div className="flex flex-col ">
            <div className="text-2xl flex items-center w-full h-1/4  my-4">Cart</div>
            <form className=" flex gap-2 w-full h-3/4">
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
                    <div className="h-2/3 w-full">
                        {cartData?.items.map(cart => (
                            <div className="flex items-center  gap-2 border-b-2  w-full">
                                <div className="w-1/6 text-center"><img src={ApiImage + `/${cart.productID.name}/${cart.productID.images[0]}`} alt="image-product" /></div>
                                <div className="w-1/6 text-center">{cart.productID.name}</div>
                                <div className="w-1/6 text-center">{cart.productID.price}</div>
                                <div className="w-1/6 text-center">Quantity</div>
                                <div className="w-1/6 text-center">aa</div>
                                <div className="w-1/6 text-center">Remove</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 bg-white h-full w-3/12 p-2 rounded-lg">
                    <div className="flex items-center w-full h-1/2 justify-between">
                        <div>Sum:</div>
                        <div>500</div>
                    </div>
                    <div className="flex items-center gap-4 w-full h-1/2 justify-between ">
                        <Link href={'/'} className="bg-gradient-to-r from-signup-left to-signup-right text-white rounded-full p-1 w-3/5 text-center">
                            Continue Shopping
                        </Link>
                        <button className="text-signup-left outline outline-offset-2 outline-1 rounded-full p-0.5 w-2/5">Pay</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CartPage;
