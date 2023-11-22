'use client'
import axios from "axios";
import Swal from "sweetalert2";
import { BsCurrencyDollar } from "react-icons/bs";
import { format } from 'date-fns';
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineBorderColor } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";

import Spinner1 from "@/components/spinner1";
const apiOrder = process.env.NEXT_PUBLIC_API_ORDER;

const OrderPage = () => {
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    
    const border1 = 'border border-slate-400';
    const border2 = border1 + ' font-semibold text-xl';
    
    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    }, []);

    useEffect(() => {
        callApiGetAllOrder();
    }, [user])

    const callApiGetAllOrder = async() => {
        setLoading(true);
        await axios.get(apiOrder, {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        })
        .then(result => {
            setOrder(result.data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    const handleDeleteOrder = async(id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will Delete Order This Order",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if(result.isConfirmed) {
                axios.delete(apiOrder + `/delete/${id}`, { headers: {token: `Bearer ${user?.accessToken}`}});
                window.location.reload();
            }
        });
    }

    const handleUpdateStatus = async(id) => {
        try {
            const response = await axios.patch(apiOrder + `/update-status/${id}`, null, {
                headers: {
                    token: `Bearer ${user?.accessToken}`
                }
            })
            if(response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Status Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                callApiGetAllOrder();
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Update Status Failed',
                    text: 'Please try again later.',
                });
            }
        } catch (err) {
            console.error('Error updating status:', err);
            Swal.fire({
                icon: 'error',
                title: 'Update Status Failed',
                text: 'Please try again later.',
            });
        }
    }
    
    console.log(order);
    console.log(user);
    return (
        <div className="flex flex-col">
            {loading ? (
                <div className="text-center py-40"><Spinner1 /></div>
            ) : (
                <div>
                    <div className="text-blue-900 font-semibold text-3xl cursor-pointer hover:text-btn">Order List</div>
                    <table className={`table-auto border-collapse ${border1} w-11/12 mt-5`}>
                            <thead>
                                <tr className="bg-blue-900 text-white text-center">
                                    <td className={border2}>Number</td>
                                    <td className={border2}>Order By</td>
                                    <td className={border2}>ID Order</td>
                                    <td className={border2}>Order At</td>
                                    <td className={border2}>Status</td>
                                    <td className={border2}>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map((ord, index) => (
                                    <tr key={ord._id} className="">
                                        <td className={`${border1} pl-2 text-center`}>{index + 1}</td>
                                        <td className={`${border1} pl-2`}>{ord.orderBy?.username}</td>
                                        <td className={`${border1} pl-2`}>{ord._id}</td>
                                        <td className={`${border1} pl-2 text-center`}>
                                            {format(new Date(ord.createdAt), 'HH:mm dd-MM-yyyy')}
                                        </td>
                                        <td className={`${border1} pl-2`}>{ord.status}</td>
                                        <td className={`${border1} pl-2 flex items-center justify-center`}><span className="text-btn text-lg font-semibold">{ord.totalPrice}</span> <BsCurrencyDollar/></td>
                                        <td className={`${border1} flex justify-center gap-4 p-2`}>
                                            <Link className="flex items-center gap-2 bg-slate-300 p-2 rounded-lg hover:bg-lime-700 hover:text-white" href={`/dashboard/order/${ord._id}`}><MdOutlineBorderColor/>Detail</Link>
                                            <button onClick={() => handleUpdateStatus(ord._id)} className="flex items-center gap-2 bg-slate-300 p-2 rounded-lg hover:bg-blue-900 hover:text-white"><RxUpdate />Update</button>
                                            <button onClick={() => handleDeleteOrder(ord._id)} className="flex items-center gap-2 bg-slate-300 p-2 rounded-lg hover:bg-red-800 hover:text-white"><RiDeleteBinLine/>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                </div>
            )}
        </div>
     );
}
 
export default OrderPage;