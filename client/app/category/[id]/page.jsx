'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link'

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;

const Category = () => {
    const { id } = useParams();
    const [productByCategory, setProductByCategory] = useState([]);

    useEffect(() => {
        axios.get(ApiProduct+`/category/${id}`)
            .then(result => setProductByCategory(result.data))
            .catch(err => console.log(err))
    }, [id])

    // console.log(productByCategory);
    return (
        <div className='py-5'>
            <div className=''>
                <div className='flex items-center justify-between my-10'>
                    <h1 className='text-3xl'>Product</h1>
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
                                <img src={ApiStaticFile + `/${product.name}/${product.images[0]}`} alt="logo" className='w-full h-3/5 object-cover'/>
                                <div className='h-1/5 text-lg text-center mt-0'>{product.name}</div>
                                <div className='text-sm text-center text-category h-1/5 mb-0'>{product.price} &ensp;</div>
                        </div>
                    </Link>
                ))}  
                </div>
            </div>
        </div>
    )
}

export default Category;
