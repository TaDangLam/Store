'use client'
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const EditPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [nameCate, setNameCate] = useState('');

    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    }, [])

    useEffect(() => {
        axios.get(apiCategory + `/${id}`, {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        })
        .then(result => setNameCate(result.data.name));
    }, [user])
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        await axios.patch(apiCategory + `/${id}`, {name: nameCate}, {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        })
        .then(result => console.log(result.data))
        router.push('/dashboard/category');
    }

    return ( 
        <div>
            <div className="flex item-center gap-4">
                <Link href={'/dashboard/category'} className="text-blue-900 text-3xl mb-5 hover:text-btn font-semibold">Category</Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                <div className="text-blue-900 text-3xl mb-5 hover:text-btn font-semibold">Update Category</div>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                    <label className="text-blue-900">Category Name:</label>
                    <input type="text" value={nameCate} onChange={e => setNameCate(e.target.value)}/>
                    <button type="submit" className="text-white bg-blue-900  py-1 rounded-md w-16">Save</button>
                </form>
            </div>
        </div>
     );
}
 
export default EditPage;