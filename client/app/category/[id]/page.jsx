'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { BsCurrencyDollar } from "react-icons/bs";

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

// const quickSort = (arr, sortBy) => {
//     if (arr.length <= 1) {
//       return arr;
//     }
  
//     const pivot = arr[0];
//     const left = [];
//     const right = [];
  
//     for (let i = 1; i < arr.length; i++) {
//       if (arr[i][sortBy] < pivot[sortBy]) {
//         left.push(arr[i]);
//       } else {
//         right.push(arr[i]);
//       }
//     }
  
//     return [...quickSort(left, sortBy), pivot, ...quickSort(right, sortBy)];
//   }

const Category = () => {
    const { id } = useParams();
    const router = useRouter();
    const [nameCategory, setNameCategory] = useState('');
    const [productByCategory, setProductByCategory] = useState([]);
    // const [sortedProducts, setSortedProducts] = useState([]);
    // const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        axios.get(ApiProduct+`/category/${id}`)
            .then(result => setProductByCategory(result.data))
            .catch(err => console.log(err))

        axios.get(ApiCategory+`/${id}`)
            .then(response => setNameCategory(response.data))
            .catch(err => console.log(err))
    }, [id])

    // useEffect(() => {
    //     if (productByCategory.length > 0 && sortBy) {
    //       const sorted = quickSort([...productByCategory], sortBy);
    //       setSortedProducts(sorted);
    //     } else {
    //       setSortedProducts([...productByCategory]);
    //     }
    // }, [productByCategory, sortBy]);

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
                    <select 
                        className='h-10 rounded-lg'
                        // onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="">Sort</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
                <div className='grid grid-cols-5 grid-rows-5 gap-5 '>
                {productByCategory.map(product => (
                    <Link href={`/productdetail/${product._id}`} className=' '>
                        <div className='bg-white rounded-pd h-100 w-full'>
                                <img src={ApiStaticFile + `/${product.name}/${product.images[0]}`} alt="logo" className='w-full h-4/6 object-cover'/>
                                <div className='h-1/6 text-sm text-center mt-0'>{product.name}</div>
                                <div className=' h-1/6 mb-0 flex items-center justify-center'>
                                    <span className='flex font-medium text-md text-category'>{product.price} <BsCurrencyDollar /></span>
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
