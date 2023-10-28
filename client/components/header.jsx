'use client'
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaBlogger } from "react-icons/fa";
import { BiInfoCircle, BiChevronDown } from "react-icons/bi";
import Link from 'next/link'
import { useState } from "react";

const Header = () => {

    const handleSearch = () => {

    }

    return(
        <div className="parent-div">
            <div className=" flex items-center justify-between ">
                <div className="cursor-pointer">
                    <Link href={'/'}><img src="/logo.jpg" alt="logo" className="w-32 h-32 rounded"/></Link>
                </div>
                <form 
                    onSubmit={handleSearch} 
                    className="flex items-center h-12 pl-6 w-488 bg-white"
                >
                    <input 
                        type="text"
                        placeholder="Search for products..." 
                        className="rounded-l-2xl p-5 h-full w-11/12 bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-200 focus:shadow-sm"
                    />
                    
                    <button 
                        type="submit"
                        className="bg-slate-100 text-black p-1 rounded-r-2xl h-full w-1/12 flex items-center justify-center">
                            <FaSearch />
                    </button>
                </form> 
                
                <div className="flex items-center px-10 gap-10 bg-white">
                    <div className=""><Link href={'/auth'} className="flex items-center bg-white text-lg hover:text-red-500"><FaUserAlt className="mr-1 "/>Login / Sign Up</Link></div>
                    <div><Link href={'/cart'} className="flex items-center text-lg bg-white hover:text-red-500"><FaShoppingCart className="mr-1"/>Cart</Link></div>
                </div>
            </div>
            <div className=" flex gap-10 h-10 items-center ">
                <div className="text-xl flex gap-2 items-center">
                    <FaBars />
                    Category
                    <BiChevronDown className=""/>
                </div>
                <Link href={'/introduce'} className="text-xl flex gap-2 items-center">
                    <BiInfoCircle />
                    Introduce
                </Link>
                <Link href={'/blog'} className="text-xl flex gap-2 items-center">
                    <FaBlogger />
                    Blog
                </Link>
            </div>
         </div>
    )
}

export default Header;
