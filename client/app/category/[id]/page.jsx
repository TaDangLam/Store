'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const Category = () => {
    const { id } = useParams();
    const router = useRouter()
    const [nameCategory, setNameCategory] = useState('');
    const [productByCategory, setProductByCategory] = useState([]);

    useEffect(() => {
        axios.get(ApiProduct+`/category/${id}`)
            .then(result => setProductByCategory(result.data))
            .catch(err => console.log(err))

        axios.get(ApiCategory+`/${id}`)
            .then(response => setNameCategory(response.data))
            .catch(err => console.log(err))
    }, [id])

    const handleBackHome = () => {
        router.push('/');
    }

    const handleBackCategory = () => {
        // router.push()
        console.log(`/category/${id}`);
    }

    // console.log(nameCategory);
    return (
        <div className='py-5'>
            <div className=''>
                <div className='flex items-center justify-between my-10'>
                    <div className='flex gap-2'>
                        <span 
                            className='text-3xl cursor-pointer hover:text-red-500'
                            onClick={handleBackHome}
                        >
                            Home
                        </span>
                        <span className='text-3xl'>/</span>
                        <span 
                            className='text-3xl cursor-pointer hover:text-red-500'
                            onClick={handleBackCategory}
                        >
                            {nameCategory.name}
                        </span>
                    </div>
                    <select className='h-10 rounded-lg'>
                        <option value="">Sort</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
                <div className='grid grid-cols-5 grid-rows-5 gap-4  '>
                {productByCategory.map(product => (
                    <Link href={`/productdetail/${product._id}`} className='bg-rose-600 '>
                        <div className='bg-white rounded-pd h-100 w-full'>
                                <img src={ApiStaticFile + `/${product.name}/${product.images[0]}`} alt="logo" className='w-full h-4/6 object-cover'/>
                                <div className='h-1/6 text-sm text-center mt-0'>{product.name}</div>
                                <div className=' h-1/6 mb-0 flex items-center justify-center'>
                                    <span className='text-sm  text-category'>{product.price} &ensp;</span>
                                </div>
                        </div>
                    </Link>
                ))}  
                </div>
            </div>
        </div>
    )
}

export default Category;
