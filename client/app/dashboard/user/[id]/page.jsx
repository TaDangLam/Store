'use client'

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiUser = process.env.NEXT_PUBLIC_API_USER;

const DeleteUser = () => {
    const { id } = useParams();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(apiUser + `/${id}`)
            .then(result => setUser(result.data))
            .catch(err => console.log(err))
    }, [id])
    
    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUserData(JSON.parse(userJSON));
        }
    }, [])

    const handleDelete = async() => {
        await axios.delete(apiUser + `/${id}`, {
            headers: {
                token: `Bearer ${userData?.accessToken}`
            }
        })
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
        router.push('/dashboard/user')
    }

    const handleBack = () => {
        router.push('/dashboard/user')
    }

    return ( 
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 text-center">
                <p className="text-3xl">Are You Sure Delete User:</p>
                <p className="text-xl text-blue-900 font-semibold">"{user?.name}"</p>
            </div>
            <div className="flex items-center justify-center gap-5">
                <button onClick={handleDelete} className="bg-red-500 rounded-xl py-2 px-8 hover:bg-red-700 hover:text-white">Yes</button>
                <button onClick={handleBack} className="bg-slate-400 rounded-xl py-2 px-8 hover:bg-slate-600 hover:text-white">No</button>
            </div>
        </div>
     );
}
 
export default DeleteUser;