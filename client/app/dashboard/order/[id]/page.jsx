'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsCurrencyDollar } from "react-icons/bs";

import Spinner1 from "@/components/spinner1";
import Link from "next/link";
const apiOrder = process.env.NEXT_PUBLIC_API_ORDER;
const apiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;

const Detail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    }, []);
    
    useEffect(() => {
        setLoading(true);
        axios.get(apiOrder + `/order-detail/${id}`)
            .then(result => {
                setOrderDetail(result.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, [user])
    console.log(orderDetail)
    return ( 
        <div>
            {loading ? (
                <div className="text-center py-40"><Spinner1 /></div>
            ) : (
                <div className="flex flex-col gap-5 w-full h-full">
                    <div className="flex gap-3 w-full">
                        <Link href={'/dashboard/order'} className="text-blue-900 text-3xl font-semibold hover:text-btn">Order List</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                        <div  className="text-blue-900 text-3xl font-semibold hover:text-btn cursor-pointer">Order Detail</div>
                    </div>
                    <div className="flex gap-5 w-full p-2">
                        <div className="w-4/12">
                            <div className="flex flex-col border-4 p-4 gap-4">
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <span className="font-semibold">Information User</span>
                                </div>
                                <div className="flex gap-4"><span className="font-medium">Name:</span>{orderDetail?.user.name}</div>
                                <div className="flex gap-4"><span className="font-medium">Address:</span>{orderDetail?.user.address}</div>
                                <div className="flex gap-4"><span className="font-medium">Phone:</span>{orderDetail?.user.phone}</div>
                                <div className="flex gap-4"><span className="font-medium">Province:</span>{orderDetail?.user.province}</div>
                            </div>
                            
                        </div>
                        <div className="flex flex-col gap-1 w-8/12 p-4">
                            <div className="flex gap-1 items-center w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className="font-semibold">Information Product</span>
                            </div>
                            {orderDetail?.items.map(order => (
                                <div className="flex items-center gap-7 w-full p-2 border-b-2">
                                    <div className="w-2/12 flex ">
                                        <img src={apiStaticFile + `/${order.productID.name}/${order.productID.images[0]}`} alt="img-Product" />
                                    </div>
                                    <div className="w-6/12">{order.productID.name}</div>
                                    <div className="w-2/12 text-center">{order.amount}</div>
                                    <div className="w-2/12 flex">
                                        <span className="font-semibold">{order.productID.price * order.amount}</span>
                                        <span className="text-btn font-semibold"><BsCurrencyDollar /></span>
                                    </div>
                                </div>
                            ))}
                            <div className="flex border-b-2 border-rose-500 w-full py-2 px-10 justify-between">
                                <span className="text-3xl font-semibold">Total:</span>
                                <div className="flex text-3xl font-semibold">{orderDetail?.totalPrice}<BsCurrencyDollar className="text-btn"/></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )}
        </div>
     );
}
 
export default Detail;