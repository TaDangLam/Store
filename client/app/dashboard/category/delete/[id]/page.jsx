'use client'
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const DeletePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [cateDetail, setCateDetail] = useState(null);

    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }

        axios.get(apiCategory + `/${id}`)
        .then(result => setCateDetail(result.data))
    }, [])
    
    const cancleCategory = () => {
        router.push('/dashboard/category')
    }

    const yesDeleteCategory = async() => {
        await axios.delete(apiCategory + `/${id}`, {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        })
        router.push('/dashboard/category');
    }

    return ( 
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 text-center">
                <p className="text-3xl">Are You Sure Delete Category:</p>
                <p className="text-xl text-blue-900 font-semibold">"{cateDetail?.name}"</p>
            </div>
            <div className="flex items-center justify-center gap-5">
                <button onClick={yesDeleteCategory} className="bg-red-500 rounded-xl py-2 px-8 hover:bg-red-700 hover:text-white">Yes</button>
                <button onClick={cancleCategory} className="bg-slate-400 rounded-xl py-2 px-8 hover:bg-slate-600 hover:text-white">No</button>
            </div>
        </div>
     );
}
 
export default DeletePage;