'use client'
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaBlogger } from "react-icons/fa";
import { BiInfoCircle, BiChevronDown, BiSolidUserCircle } from "react-icons/bi";
import { BsFillCaretDownFill } from "react-icons/bs";
import Link from 'next/link'
import { useEffect, useState } from "react";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
        
    }, []);
    // console.log(user.user.username)
    return(
        <div className="parent-div">
            <div className=" flex items-center justify-between ">
                <div className="cursor-pointer">
                    <Link href={'/'}><img src="/logo.jpg" alt="logo" className="w-32 h-32 rounded"/></Link>
                </div>
                <form 
                     
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
                {user ? (
                    <div className="flex items-center px-8 gap-10">
                        <div><Link href={'/cart'} className="flex items-center  bg-white hover:text-red-500"><FaShoppingCart className="mr-1"/>Cart</Link></div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                            <img src="/images.png" alt="infomation" className="h-5"/>
                            <Link href={'/information'} className="">{user.user.username}</Link>
                            <BsFillCaretDownFill />
                        </div>
                    </div>
                ):(
                    <div className="flex items-center px-8 gap-10 bg-white">
                        <div className=""><Link href={'/auth'} className="flex items-center bg-white  hover:text-red-500"><FaUserAlt className="mr-1 "/>Login / Sign Up</Link></div>
                        <div><Link href={'/cart'} className="flex items-center  bg-white hover:text-red-500"><FaShoppingCart className="mr-1"/>Cart</Link></div>
                    </div>
                )}
            </div>
            <div className=" flex gap-10 h-10 items-center ">
                <div className="text-xl flex gap-2 items-center hover:text-red-500">
                    <FaBars/>
                    Category
                    <BiChevronDown className="text-red-500"/>
                </div>
                <Link href={'/introduce'} className="text-xl flex gap-2 items-center hover:text-red-500">
                    <BiInfoCircle />
                    Introduce
                </Link>
                <Link href={'/blog'} className="text-xl flex gap-2 items-center hover:text-red-500">
                    <FaBlogger />
                    Blog
                </Link>
            </div>
         </div>
    )
}

export default Header;
