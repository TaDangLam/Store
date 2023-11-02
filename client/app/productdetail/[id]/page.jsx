'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetial] = useState(null);
        
    useEffect(() => {
        axios.get(ApiProduct + `/${id}`)
            .then(result => setProductDetial(result.data));
    }, [id])

    // useEffect(() => {
    //     axios.get(ApiCategory+`${productDetail._id}`)
    // }, [])

    console.log(productDetail);

    return(
        <div className='py-4'>
            <div className='flex gap-4 h-983 w-full bg-white p-4'>
                <div className='w-1/2 h-full'>
                    <img 
                        src={ApiStaticFile + `/${productDetail?.name}/${productDetail?.images[0]}`} 
                        alt="product thumbnail" 
                        className='w-full h-3/5 '
                    />
                    <h1 className='bg-sky-100 h-2/5'>aaaa</h1>
                </div>
                <div className='w-1/2 h-full '>
                    <div className='text-3xl border-b border-category my-4'>{productDetail?.name}</div>
                    <div className='text-2xl text-category my-5'>{productDetail?.price}</div>
                    <div className=''>
                       <ul className='properties-product'>
                        {/* PC or Laptop or Mobile*/}
                        <li>{productDetail?.properties?.BRAND}</li>
                        <li>{productDetail?.properties?.CPU}</li>
                        <li>{productDetail?.properties?.MAINBOARD}</li>
                        <li>{productDetail?.properties?.RAM}</li>
                        <li>{productDetail?.properties?.STORAGE}</li>
                        <li>{productDetail?.properties?.VGA}</li>
                        <li>{productDetail?.properties?.PSU}</li>
                        <li>{productDetail?.properties?.PIN}</li>
                        <li>{productDetail?.properties?.CHARGE}</li>
                        <li>{productDetail?.properties?.COLOR}</li>
                        
                        {/* Screen.. */}
                        <li>{productDetail?.properties?.CONNECT}</li>
                        <li>{productDetail?.properties?.RESPONSETIME}</li>
                        <li>{productDetail?.properties?.SCREENTYPE}</li>
                        <li>{productDetail?.properties?.SCREENCOLOR}</li>
                        <li>{productDetail?.properties?.SCREENTYPE}</li>
                        <li>{productDetail?.properties?.SCRRENBRIGHTN}</li>
                        <li>{productDetail?.properties?.RESPONSETIME}</li>
                        <li>{productDetail?.properties?.SIZE}</li>

                        {/* Component */}
                        <li>{productDetail?.properties?.BUSSTANDARD}</li>
                        <li>{productDetail?.properties?.CORECLOCK}</li>
                        <li>{productDetail?.properties?.FAN}</li>
                        <li>{productDetail?.properties?.CUDACORE}</li>
                        <li>{productDetail?.properties?.POWERSUPPLY}</li>
                        <li>{productDetail?.properties?.PSURECOMMEND}</li>
                        <li>{productDetail?.properties?.SUPPORTOUTPUTSCREEN}</li>
                        <li>{productDetail?.properties?.VRAM}</li>

                        {/* KeyBoard */}
                        <li>{productDetail?.properties?.KEYCAP}</li>
                        <li>{productDetail?.properties?.LED}</li>
                        <li>{productDetail?.properties?.TYPE}</li>
                        <li>{productDetail?.properties?.WEIGHT}</li>

                        {/* Mouse */}
                        <li>{productDetail?.properties?.DPI}</li>
                        <li>{productDetail?.properties?.BUTTON}</li>

                        {/* HeadPhone */}
                        <li>{productDetail?.properties?.DRIVER}</li>
                        <li>{productDetail?.properties?.WEIGHT}</li>
                    </ul> 
                    </div>
                    
                    {/* <div className='bg-sky-300'>Add To Cart</div> */}
                </div>
            </div>
            <div className='flex items-center gap-2 w-full pt-2'>
                <div className='bg-blue-300 w-3/5'>bbb</div>
                <div className='bg-green-300 w-2/5'>ccc</div>
            </div>
        </div>
    )
}

export default ProductDetail;
