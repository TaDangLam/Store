'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { BsCurrencyDollar } from "react-icons/bs";

import Spinner from '@/components/spinner';

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const mergeSort = (arr, sortBy) => {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left, sortBy), mergeSort(right, sortBy), sortBy);
};

const merge = (left, right, sortBy) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (sortBy === 'asc' ? left[leftIndex].price < right[rightIndex].price : left[leftIndex].price > right[rightIndex].price) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

const Category = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [nameCategory, setNameCategory] = useState('');
    const [productByCategory, setProductByCategory] = useState([]);
    const [sortProperty, setSortProperty] = useState('');
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get(ApiProduct+`/category/${id}`)
            .then(result => {
                setProductByCategory(result.data)
            })
            .catch(err => console.log(err))

        axios.get(ApiCategory+`/${id}`)
            .then(response => {
                setNameCategory(response.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        // setLoading(false)
    }, [id])
    
    useEffect(() => {
        if (productByCategory.length > 0 && sortProperty) {
          const sortOrder = sortProperty === 'asc' ? 'asc' : 'desc';
          const sorted = mergeSort([...productByCategory], sortProperty, sortOrder);
          setSortedProducts(sorted);
        } else {
          setSortedProducts([...productByCategory]);
        }
      }, [productByCategory, sortProperty]);

      const handleChangeSort = (e) => {
        const selectedSortProperty = e.target.value;
        
        setSortProperty(selectedSortProperty);
    
        if (selectedSortProperty === 'asc' || selectedSortProperty === 'desc') {
            setLoading(true);
            const sortOrder = selectedSortProperty === 'asc' ? 'asc' : 'desc';
            const sorted = mergeSort([...productByCategory], selectedSortProperty, sortOrder);
            setSortedProducts(sorted);
        } else {
          setSortedProducts([...productByCategory]);
        }
        setLoading(false);
      };

    const handleBackHome = () => {
        router.push('/');
    }

    const handleBackCategory = () => {
        // router.push()
        console.log(`/category/${id}`);
    }

    // console.log(sortProperty);
    return (
        <div className=''>
            <div className=''>
                <div className='flex items-center justify-between my-10'>
                    <div className='flex gap-2'>
                        <span 
                            className='text-3xl font-semibold cursor-pointer hover:text-red-500'
                            onClick={handleBackHome}
                        >
                            Home
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span 
                            className='text-3xl font-semibold cursor-pointer text-red-500'
                            onClick={handleBackCategory}
                        >
                            {nameCategory.name}
                        </span>
                    </div>
                    <select 
                        className='h-10 rounded-lg'
                        onChange={handleChangeSort}
                    >
                        <option value="">Sort</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
                {loading ? 
                (
                    <div className='text-center'><Spinner /></div>
                ): (
                    <div className='grid grid-cols-5 grid-rows-5 gap-5 LamTa'>
                        {sortedProducts.map(product => (
                            <Link href={`/productdetail/${product._id}`} className=' '>
                                <div className='bg-white rounded-pd h-100 w-full'>
                                    <img src={ApiStaticFile + `/${product.name}/${product.images[0]}`} alt="logo" className='w-full h-4/6 object-contain p-1.5 rounded-pd'/>
                                    <div className='h-1/6 text-sm text-center mt-0'>{product.name}</div>
                                    <div className=' h-1/6 mb-0 flex items-center justify-center'>
                                        <span className='flex font-medium text-md text-category'>{product.price} <BsCurrencyDollar /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}  
                    </div>
                )}
            </div>
        </div>
    )
}

export default Category;
