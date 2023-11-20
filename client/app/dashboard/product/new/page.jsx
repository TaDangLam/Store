'use client'
import Link from "next/link";
import ProductForm from "../../components/productForm";

const NewProduct = () => {
    return ( 
        <div className="flex flex-col gap-2">
            <div className="flex item-center gap-4">
                <Link href={'/dashboard/product'} className="text-blue-900 text-3xl mb-5 hover:text-btn font-semibold">Product</Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                <Link href={'/dashboard/product/new'} className="text-blue-900 text-3xl mb-5 hover:text-btn font-semibold">New Product</Link>
            </div>
            <ProductForm />
        </div>
     );
}
 
export default NewProduct;