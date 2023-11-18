'use client'

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const apiOrder = process.env.NEXT_PUBLIC_API_ORDER;

const ListOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    
    const border1 = 'border border-slate-400';
    const border2 = border1 + ' font-semibold text-xl';

    useEffect(() => {
        axios.get(apiOrder + `/${id}`)
            .then(result => setOrder(result.data))
            .catch(err => console.log('message: ', err));
    }, [])
    console.log(order);
    return (
        <div className="flex flex-col gap-1">
            <div className="text-3xl text-red-500 font-semibold">Your Order</div>
            <div className="border-b-4 border-red-300 w-3/12"></div>
            <div className="flex justify-center">
                <table className={`table-auto border-collapse ${border1} w-11/12 mt-5`}>
                    <thead>
                        <tr className="bg-red-400 text-white text-center">
                            <td className={border2}>Number</td>
                            <td className={border2}>Order By</td>
                            <td className={border2}>ID Order</td>
                            <td className={border2}>Status</td>
                            <td className={border2}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((ord, index) => (
                            <tr key={ord._id}>
                                <td className={`${border1} pl-2 text-center`}>{index + 1}</td>
                                <td className={`${border1} pl-2`}>{ord.orderBy.name}</td>
                                <td className={`${border1} pl-2`}>{ord._id}</td>
                                <td className={`${border1} pl-2 `}>{ord.status}</td>
                                
                                <td className={`${border1} p-2 flex justify-center`}>
                                    <Link href={`/information/detailOrder/${ord._id}`} className="flex bg-slate-300 p-1.5 gap-1 rounded-lg text-slate-600 hover:bg-lime-700 hover:text-white w-4/5 justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default ListOrder;