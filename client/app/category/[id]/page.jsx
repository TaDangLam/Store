'use client'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation'
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
                <div className='bg-green-100'>bbbb</div>
                <div className='grid grid-cols-5 grid-rows-5 gap-3'>
                {productByCategory.map(product => (
                    <Link href={`/productdetail/${product._id}`} className='bg-rose-100'>
                        <div className='bg-white rounded-pd h-100'>
                                <img src={ApiStaticFile + `/${product.name}/${product.images[0]}`} alt="logo" className='w-max'/>
                                <div>{product.name}</div>
                                <div>{product.price}</div>
                        </div>
                    </Link>
                ))}  
                </div>
            </div>
        </div>
    )
}

export default Category;
