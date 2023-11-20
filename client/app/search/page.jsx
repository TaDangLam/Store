'use client'
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { BsCurrencyDollar } from "react-icons/bs";

const apiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;

const searchPage = () => {
    const searchParams = useSearchParams();
    const [searchProduct, setSearchProduct] = useState([]);
    const search = searchParams.get('search')
    
    useEffect(() => {
        axios.get(apiProduct + `/search?search=${search}`)
        .then(result => setSearchProduct(result.data))
        .catch(err => console.log(err));
    }, [search])
    console.log(searchProduct)

    return (
        <div className='flex flex-col gap-5 p-3'>
            <div className='w-full p-1 flex justify-between'>
                <div className='text-xl bg-slate-50 rounded-lg p-2 font-semibold'>Search Results: <span className='text-btn font-semibold'>{searchProduct.length}</span></div>
                <div>
                    <select className='h-10 rounded-lg'>
                        <option value="">Sort</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-5 grid-rows-5 gap-5'>
                {searchProduct.map(product => (
                    <Link href={`/productdetail/${product._id}`} className='h-full w-full'>
                        <div className='bg-white rounded-pd h-100 w-full p-1'>
                                <div className='w-full h-4/6'><img src={ApiStaticFile + `/${product.name}/${product.images[0]}`} alt="logo" className='h-full w-full object-contain rounded-pd '/></div>
                                <div className='h-1/6 text-sm text-center mt-0'>{product.name}</div>
                                <div className=' h-1/6 mb-0 flex items-center justify-center'>
                                    <span className='flex font-medium text-md text-category'>{product.price} <BsCurrencyDollar /></span>
                                </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default searchPage;