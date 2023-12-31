'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner1 from "@/components/spinner1";

const apiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const CategoryPage = () => {
    const router = useRouter();
    const [category, setCategory] = useState([]);
    const [categoryNew, setCategoryNew] = useState([{name: ''}]);
    const [loading, setLoading] = useState(false);

    const border1 = 'border border-slate-400';
    const border2 = border1 + ' font-semibold text-xl';

    useEffect(() => {
        setLoading(true);
        axios.get(apiCategory)
        .then(result => {
            setCategory(result.data);
            setLoading(false);
        });
    }, []);

    return ( 
        <div >
            {loading ? (
                <div className="text-center py-40"><Spinner1 /></div>
            ) : (
                <div>
                                <Link href={'/dashboard/category/new'} className="bg-blue-900 text-white rounded-md py-1 px-2 ">Add New Category</Link>
            <table className={`table-auto border-collapse ${border1} w-11/12 mt-5 ml-2`}>
                <thead>
                    <tr className="bg-blue-900 text-white text-center">
                        <td className={border2}>Category Name</td>
                        <td className={border2}>ID</td>
                        <td className={border2}></td>
                    </tr>
                </thead>
                <tbody>
                    {category.map(cate => (
                        <tr key={cate._id}>
                            <td className={`${border1} pl-2 text-`}>{cate.name}</td>
                            <td className={`${border1} pl-2`}>{cate._id}</td>
                            <td className={`${border1} flex justify-center gap-4 py-2.5`}>
                                <Link href={`/dashboard/category/edit/${cate._id}`} className="flex bg-blue-900 p-2 gap-1 rounded-lg text-white hover:bg-blue-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                        </svg>
                                        Edit
                                </Link>
                                <Link href={`/dashboard/category/delete/${cate._id}`} className="flex bg-slate-400 p-2 gap-1 rounded-lg text-white hover:bg-rose-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                        Delete
                                </Link>
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
 
export default CategoryPage;