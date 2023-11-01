'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(ApiProduct + `/${id}`)
            .then(result => setProduct(result.data));
    }, [id])
    console.log(product)
    return(
        <h1>Product Page</h1>
    )
}

export default ProductDetail;
