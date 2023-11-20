'use client'
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";

const apiOrder = process.env.NEXT_PUBLIC_API_ORDER;
const apiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;

const OrderDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [orderDetail, setOrderDetail] = useState(null);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        axios.get(apiOrder + `/order-detail/${id}`)
            .then(result => {
                setOrderDetail(result.data);
                const newTotalAmount = result.data.items.reduce((sum, order) => {
                    return sum + (order.productID.price * order.amount);
                }, 0)
                setTotal(newTotalAmount);
            })
            .catch(err => console.log(err));
    }, [])


    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString)
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

        const formattedDateTime1 = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}, ${day}/${month}/${year}`;
        return formattedDateTime1;
    }

    
    return ( 
        <div className=" flex flex-col gap-3 w-full">
            <div className="bg-slate-50 w-full flex justify-between rounded-md">
                <div className="p-2 flex gap-2"><span className="text-l">Order Detail:</span> <span className="hover:text-blue-700 cursor-pointer font-medium">#{orderDetail?._id}</span></div>
                <div className="p-2 flex gap-2"><span className="text-l">Order At:</span> <span className=" font-medium">{formatDateTime(orderDetail?.createdAt)}</span></div>
            </div>
            <div className=" flex gap-4 w-full ">
                <div className="flex flex-col gap-3 bg-slate-50 w-2/3 p-4 rounded-md">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="font-semibold">Information User</span>
                    </div>
                    <div className="flex gap-4"><span className="font-medium">Name:</span> <span>{orderDetail?.user.name}</span></div>
                    <div className="flex gap-4"><span className="font-medium">Phone:</span> <span>{orderDetail?.user.phone}</span></div>
                    <div className="flex gap-4"><span className="font-medium">Province:</span> <span>{orderDetail?.user.province}</span></div>
                    <div className="flex gap-4"><span className="font-medium">Address:</span> <span>{orderDetail?.user.address}</span></div>
                </div>
                <div className="flex flex-col gap-3 bg-slate-50 w-1/3 p-4 rounded-md">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <span className="font-semibold">Payment</span>
                    </div>
                    <div className="flex gap-1 ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 7.629A3 3 0 009.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 01-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 011.422 0l.655.218a2.25 2.25 0 001.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Ship COD</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 bg-slate-50 w-full p-4 rounded-md">
                <div className="flex gap-1 items-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="font-semibold">Information Product</span>
                </div>

                {orderDetail?.items.map(order => (
                    <div className="flex w-full gap-4 px-2 py-1 border-b-2 border-slate-200">
                        <div className=" w-2/12 ">
                            <img src={apiStaticFile + `/${order.productID.name}/${order.productID.images[0]}`} alt="img-Product" />
                        </div>

                        <div className="flex flex-col  gap-5 w-8/12 p-2">
                            <div>{order.productID.name}</div>
                            <div><span>Amount: </span><span>{order.amount}</span></div>
                        </div>

                        <div className="flex w-2/12 p-2">
                            <span >{order.productID.price * order.amount}</span>
                            <span><BsCurrencyDollar /></span>
                        </div>
                    </div>
                    
                ))}
                <div className="flex w-full justify-between py-2 px-16 border-b-2 border-rose-500 ">
                    <div className="text-2xl font-semibold">Total:</div>
                    <div className="flex"><span className="text-2xl font-semibold text-red-700">{total}</span> <span><BsCurrencyDollar /></span></div>
                </div>

                <Link href={`/information/orderUser/${orderDetail?.user._id}`} className="w-1/2 mr-0 bg-red-700 text-white text-md text-center p-3 rounded-full font-semibold hover:bg-red-500 cursor-pointer">
                    Back Order Page
                </Link>

            </div>
        </div>
     );
}
 
export default OrderDetail;