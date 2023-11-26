'use client'
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { BsCurrencyDollar } from "react-icons/bs";
import Spinner from '@/components/spinner';

const apiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;

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

const searchPage = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get('search');
	const [searchProduct, setSearchProduct] = useState([]);
	const [sortProperty, setSortProperty] = useState('');
	const [sortedProducts, setSortedProducts] = useState([]);
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		setLoading(true)
		axios.get(apiProduct + `/search?search=${search}`)
			.then(result => {
				setSearchProduct(result.data)
				setLoading(false)
			})
			.catch(err => console.log(err));

	}, [search])
	// console.log(searchProduct)

	useEffect(() => {
		if (searchProduct.length > 0 && sortProperty) {
			const sortOrder = sortProperty === 'asc' ? 'asc' : 'desc';
			const sorted = mergeSort([...searchProduct], sortProperty, sortOrder);
			setSortedProducts(sorted);
		} else {
			setSortedProducts([...searchProduct]);
		}
	}, [searchProduct, sortProperty]);

	const handleChangeSort = (e) => {
		const selectedSortProperty = e.target.value;
		setSortProperty(selectedSortProperty);
		if (selectedSortProperty === 'asc' || selectedSortProperty === 'desc') {
			const sortOrder = selectedSortProperty === 'asc' ? 'asc' : 'desc';
			const sorted = mergeSort([...searchProduct], selectedSortProperty, sortOrder);
			setSortedProducts(sorted);
		} else {
			setSortedProducts([...searchProduct]);
		}
	};

	return (
		<div className=''>
			{loading ? (
				<div className='h-[400px] text-center py-40'><Spinner /></div>
			) : (
				<div className='flex flex-col gap-5 p-3'>
					<div className='w-full p-1 flex justify-between'>
                    <div className='text-xl bg-slate-50 rounded-lg p-2 font-semibold'>Search Results: <span className='text-btn font-semibold'>{searchProduct.length}</span></div>
                    <div>
                        <select onChange={handleChangeSort} className='h-10 rounded-lg'>
                            <option value="">Sort</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>
                	</div>
                	<div className='grid grid-cols-5 grid-rows-5 gap-5'>
                    	{sortedProducts.map(product => (
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
			)}
		</div>
	);
}

export default searchPage;