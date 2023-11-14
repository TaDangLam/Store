'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { BiSkipPreviousCircle, BiSkipNextCircle } from "react-icons/bi";

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;
const ApiCart = process.env.NEXT_PUBLIC_API_CART;

const ProductDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [productDetail, setProductDetial] = useState(null);
    const [user, setUser] = useState(null);
    const [nameCategory, setNameCategory] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
        
    useEffect(() => {
        axios.get(ApiProduct + `/${id}`)
            .then(result => setProductDetial(result.data));
    }, [id])

    useEffect(() => {
        if(productDetail){
            axios.get(ApiCategory+`/${productDetail?.categories}`)
            .then(res => setNameCategory(res.data))
            .catch(err => console.log(err));
        }
    }, [productDetail])
    
    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    }, []);

    const handleBackHome = () => {
        router.push('/');
    }

    const handleBackCategoryPage = () => {
        const cateId = productDetail.categories;
        router.push(`/category/${cateId}`);
    }

    const handleIncreaseQuantity = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    }

    const handleDecreaseQuantity = (e) => {
        e.preventDefault();
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleAddToCart = async() => {
        const data = {
            orderBy: user.user._id,
            items: [{
                productID: productDetail._id,
                amount: 1
            }]
        }

        await axios.post(ApiCart, data, {
            headers: {
                token: `Bearer ${user.accessToken}`
            },
        })
        .then(response => console.log('Product add to cart: ', response.data))
        .catch(err => console.log(err));
    }

    const goToPreviousImg = () => {
        if(currentImage > 0){
            setCurrentImage(currentImage - 1);
        }
    }

    const goToNextImg = () => {
        if(currentImage < productDetail?.images.length - 1){
            setCurrentImage(currentImage + 1);
        }
    }

    const handleImageClick = (index) => {
        setCurrentImage(index);
    }
    console.log(user);
    // console.log(productDetail);
    return(
        <div className='py-4'>
            <div className='flex gap-2 py-6'>
                <span 
                    className='text-2xl cursor-pointer hover:text-red-500'
                    onClick={handleBackHome}
                >
                    Home
                </span>
                <span className='text-2xl'>/</span>
                <span 
                     className='text-2xl cursor-pointer hover:text-red-500'
                     onClick={handleBackCategoryPage}
                >
                    {nameCategory?.name}
                </span>
                <span className='text-2xl'>/</span>
                <span 
                     className='text-2xl cursor-pointer hover:text-red-500'
                >
                    {productDetail?.name}
                </span>
            </div>
            <div className='flex gap-4 h-983 w-full bg-white p-4'>
                <div className='w-1/2 h-full'>
                    <div className='w-full h-3/5 relative group'>
                        <img 
                        src={ApiStaticFile + `/${productDetail?.name}/${productDetail?.images[currentImage]}`} 
                        alt="product thumbnail" 
                        className='w-full h-full rounded-lg object-cover'
                        />
                        <div>
                            <BiSkipPreviousCircle 
                                className=' text-btn absolute left-0 top-1/2 transform -translate-y-1/2  cursor-pointer w-12 h-12 group-hover:block hidden'
                                onClick={goToPreviousImg}                        
                            />
                        </div>
                        <div>
                            <BiSkipNextCircle 
                                className=' absolute right-0 top-1/2 transform -translate-y-1/2 text-btn cursor-pointer w-12 h-12 group-hover:block hidden'
                                onClick={goToNextImg}                        
                            />
                        </div>
                        
                    </div>
                    <div className=' h-2/5 flex p-5 gap-5 LamTa'>
                        {productDetail?.images.map((image, index) => (
                            <div 
                                key={index}
                                className={`w-28 h-28 p-1 rounded-lg border-2 ${currentImage === index ? 'border-btn' : 'border-slate-300'} border-slate-300 hover:border-btn cursor-pointer`}
                                onClick={() => handleImageClick(index)}
                            >
                                <img src={ApiStaticFile+`/${productDetail?.name}/${image}`} alt="img-product" className='w-full h-full object=cover' />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-1/2 h-full'>
                    <div className='text-3xl border-b border-category my-4'>{productDetail?.name}</div>
                    <div className='text-2xl text-category my-5'>{productDetail?.price}</div>
                    <div className=''>
                        {productDetail ? (
                            <ul className='properties-product'>
                                {productDetail.properties.map((prop, index) => (
                                    <li key={index} className='my-1 flex items-center gap-2'>
                                        <div>-</div>
                                        <div className='flex gap-2'>
                                            <p>{`${prop.key}: `}</p>
                                            <p>{`${prop.value}`}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className='flex gap-2 py-3 items-center'>
                        <div className='flex h-10 w-24  justify-between'>
                            <button className='bg-btn text-white p-2 rounded-pd' onClick={handleDecreaseQuantity}>-</button>
                            <div className='border-x-2 w-8 text-orange-cus flex items-center justify-center'>{quantity}</div>
                            <button className='bg-btn text-white p-2 rounded-pd' onClick={handleIncreaseQuantity}>+</button>
                        </div>
                        <button className='bg-btn text-white p-2 rounded-pd' onClick={handleAddToCart}>Add To Cart</button>
                        <button className='bg-btn text-white p-2 rounded-pd' >Buy</button>
                    </div>
                    {/* <div className='bg-sky-300'>Add To Cart</div> */}
                </div>
            </div>
            <div className='flex items-center gap-2 w-full pt-2'>
                <div className='bg-blue-300 w-3/5'>Mô Tả</div>
                <div className='bg-green-300 w-2/5'>Đánh giá</div>
            </div>
        </div>
    )
}

export default ProductDetail;
