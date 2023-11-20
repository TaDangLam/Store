'use client'
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;

const DeleteProduct = () => {
    const { id } = useParams();
    const router = useRouter();
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        axios.get(apiProduct + `/${id}`)
        .then(result => setProductId(result.data))
        .catch(err => console.log(err));
    }, [])

    const cancleProduct = () => {
        router.push('/dashboard/product');
    }

    const yesDeleteProduct = async() => {
        await axios.delete(apiProduct + `/${id}`)
                .then(mess => console.log(mess))
                .catch(err => console.log(err));
        router.push('/dashboard/product');
    }
    console.log(productId);
    return ( 
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 text-center">
                <p className="text-3xl">Are You Sure Delete Product:</p>
                <p className="text-xl text-blue-900 font-semibold">"{productId?.name}"</p>
            </div>
            <div className="flex items-center justify-center gap-5">
                <button onClick={yesDeleteProduct} className="bg-red-500 rounded-xl py-2 px-8 hover:bg-red-700 hover:text-white">Yes</button>
                <button onClick={cancleProduct} className="bg-slate-400 rounded-xl py-2 px-8 hover:bg-slate-600 hover:text-white">No</button>
            </div>
        </div>
     );
}
 
export default DeleteProduct;