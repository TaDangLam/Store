'use client'
import Link from "next/link";
import { useParams } from "next/navigation";

const NotifyPage = () => {
    const { id } = useParams();
    
    console.log(id);
    return ( 
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-login-left to-login-right">
            <div className="flex flex-col justify-center items-center  gap-5 h-2/4 w-2/5  rounded-pd bg-white">
                <div className="flex justify-center items-center  w-full h-2/5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-lime-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="flex items-center  justify-center text-btn text-3xl font-bold w-full ">Order Success</div>
                <div className="flex gap-5 items-center justify-center w-full mt-2">
                    <Link href={'/'} className="bg-red-700 hover:bg-red-500 p-3 rounded-pd text-white">Continue Shopping</Link>
                    <Link href={`/detailOrder/${id}`} className="bg-slate-400 hover:bg-lime-600 p-3 rounded-pd text-white">Order Details</Link>
                </div>
            </div>
        </div>
     );
}
 
export default NotifyPage;