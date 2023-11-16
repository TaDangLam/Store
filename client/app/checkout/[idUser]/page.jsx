'use client'
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

const Apicart = process.env.NEXT_PUBLIC_API_CART;
const Apiuser = process.env.NEXT_PUBLIC_API_USER;
const Apiorder = process.env.NEXT_PUBLIC_API_ORDER;

const CheckoutPage = () => {
    const router = useRouter();
    const { idUser } = useParams();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState('');
    const [phone, setPhone] = useState('');
    const [cartData, setCartData] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [productPrices, setProductPrices] = useState({});
    const [total, setTotal] = useState(0);

    const getUserFromSessionStorage = () => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    };
    // console.log(user);
    useEffect(() => {
        getUserFromSessionStorage();
    }, []);

    // console.log(userData)
    useEffect(() => {
        callApi();
    }, [idUser, user])

    useEffect(() => {
        calculateProductPrices();
    }, [quantities, cartData])

    useEffect(() => {
        setEmail(user?.user.email);
        setName(user?.user.name);
        setAddress(user?.user.address);
        setProvince(user?.user.province);
        setPhone(user?.user.phone);
     }, [user]);

    const callApi = async() => {
        await axios.get(Apicart + `/${idUser}`, {
            headers: {
                token: `Bearer ${user?.accessToken}`
            },
        })
        .then(result => {
            const defaultQuantities = {}
            result.data.items.forEach(cartItem => {
                defaultQuantities[cartItem.productID._id] = cartItem.amount;
            });
            setQuantities(defaultQuantities);
            setCartData(result.data);
        })
        .catch(err => console.log(err))
    }
    // console.log(quantities);

    const calculateProductPrices = () => {
        const calculatedProductPrices = {};
        let sum = 0;

        if(cartData && cartData.items){
            cartData.items.forEach(cartItem => {
                const quantity = quantities[cartItem.productID._id] || 1;
                const productPrice = cartItem.productID.price * quantity;
                calculatedProductPrices[cartItem.productID._id] = productPrice;
                sum += productPrice;
            })
            setProductPrices(calculatedProductPrices);
            setTotal(sum);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
        try {
            const response = await axios.post(Apiorder, {
                orderBy: user.user._id,
                totalPrice: total,
                status: 'Processing',
                items: cartData.items.map(cartItem => (
                    {
                        productID: cartItem.productID._id,
                        amount: cartItem.amount,
                    }
                )),
            });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const backPageCart = () => {
        router.back();
    }
    // console.log({email, phone, address, province, name});
    
    
    return( 
        <div className="flex flex-col gap-8 w-full h-full py-8">
            <div className=" w-full h-2/12 text-2xl flex items-center gap-4">
                <div onClick={backPageCart} className="cursor-pointer hover:text-btn">Cart</div>
                <div><AiOutlineRight /></div>
                <div className="cursor-pointer hover:text-btn">Order</div>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-3 w-full h-10/12">
                <div className="flex flex-col gap-8 bg-white w-3/6 px-3 py-6 h-full rounded-xl">  
                    <div className="w-full text-btn text-2xl font-bold h-1/3">Payment Information</div>
                    <div className="flex flex-col gap-5 w-full h-2/3">
                        <div className="w-full h-1/5 border py-2 px-3.5 "><input readOnly onChange={(e) => setEmail(e.target.value)} value={email} className="w-full h-full outline-none" type="text" placeholder="Email"/></div>
                        <div className="w-full h-1/5 border py-2 px-3.5"><input readOnly onChange={(e) => setName(e.target.value)} value={name} className="w-full h-full outline-none" type="text" placeholder="Name"/></div>
                        <div className="w-full h-1/5 border py-2 px-3.5"><input readOnly onChange={(e) => setAddress(e.target.value)} value={address} className="w-full h-full outline-none" type="text" placeholder="Address"/></div>
                        <div className="w-full h-1/5 border py-2 px-3.5"><input readOnly onChange={(e) => setProvince(e.target.value)} value={province} className="w-full h-full outline-none" type="text" placeholder="Province"/></div>
                        <div className="w-full h-1/5 border py-2 px-3.5"><input readOnly onChange={(e) => setPhone(e.target.value)} value={phone} className="w-full h-full outline-none" type="text" placeholder="Phone"/></div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 bg-white w-3/6 rounded-xl px-4 py-6 h-full border-2 border-rose-600">
                    <div className="w-full h-1/5 text-btn text-2xl font-bold">Your Order</div>
                    <div className="flex flex-col gap-6 p-7 w-full h-3/5">
                        <div className="flex items-center justify-between border-b-2 border-rose-500 h-full w-full">
                            <div className="h-full w-7/12 text-xl font-semibold">Product</div>
                            <div className="h-full w-3/12 text-center text-xl font-semibold">Quantity</div>
                            <div className="h-full w-2/12 text-xl font-semibold">Price</div>
                        </div>
                        {cartData?.items.map(cartItem => (
                            <div className="flex items-center justify-between border-b-2 border-slate-100 h-full w-full">
                                <div className="h-full w-7/12">{cartItem.productID.name}</div>
                                <div className="h-full w-3/12 text-center">{cartItem.amount}</div>
                                <div className="h-full w-2/12">{productPrices[cartItem.productID._id]}</div>
                            </div>
                        ))}
                        <div className="flex items-center justify-between border-b-2 border-rose-500 h-full w-full">
                            <div className="h-full w-6/12 text-xl font-semibold">Total:</div>
                            <div className="h-full w-2/12 text-xl font-medium">{total}</div>
                        </div>
                    </div>
                    <button type="submit" className="w-full h-1/5 bg-rose-500 p-2 text-white rounded-lg hover:bg-rose-800">Order</button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutPage;
