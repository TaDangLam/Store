'use client'
import Link from 'next/link'
import { useEffect, useState } from "react";
import Tippy from '@tippyjs/react/headless';
import { useRouter } from 'next/navigation'
import { BsFillCaretDownFill } from "react-icons/bs";
import { BiInfoCircle, BiChevronDown, BiSolidUserCircle } from "react-icons/bi";
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaBlogger, FaRegAddressBook } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';

import Popper from './popper';

const apiUser = process.env.NEXT_PUBLIC_API_LOG_OUT

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    // const [searchItem, setSearchItem] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    }, []);
    
    const handleLogout = async() => {
        try {
            await axios.post(apiUser);
            sessionStorage.removeItem('user');
            console.log('logout successful');
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        router.push(`/search?search=${searchText}`);
    }
    // console.log(user);
    return(
        <div className="parent-div">
            <div className=" flex items-center justify-between ">
                <div className="cursor-pointer">
                    <Link href={'/'}><img src="/logo.jpg" alt="logo" className="w-32 h-32 rounded"/></Link>
                </div>
                <form 
                    onSubmit={handleSubmit}
                    className="flex items-center h-12 pl-6 w-488 bg-white"
                >
                    <input 
                        type="text"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        placeholder="Search for products..." 
                        className="rounded-l-2xl p-5 h-full w-11/12 bg-slate-100 focus:outline-none "
                    />
                    
                    <button 
                        type="submit"
                        className="bg-slate-100 text-black p-1 rounded-r-2xl h-full w-1/12 flex items-center justify-center">
                            <FaSearch />
                    </button>
                </form> 
                {user ? (
                    <div className="flex items-center px-8 gap-10">
                        <div><Link href={`/cart/${user?.user._id}`} className="flex items-center  bg-white hover:text-red-500"><FaShoppingCart className="mr-1"/>Cart</Link></div>
                        <Tippy
                            interactive
                            arrow
                            placement='bottom'
                            render={attrs => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Popper>
                                        <div className='bg-white w-56 h-full py-1 border-2 rounded-md flex flex-col gap-5 '>
                                            <Link href={'/information'} className='flex items-center gap-2 py-1 pl-3 text-lg font-md hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white'><MdOutlineAccountCircle/>Account </Link>
                                            <Link href={`/information/orderUser/${user?.user._id}`} className='flex items-center gap-2 py-1 pl-3 text-lg font-md hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white'><CiGift /> Order</Link>
                                            <Link href={'/information'} className='flex items-center gap-2 py-1 pl-3 text-lg font-md hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white'><FaRegAddressBook /> Address</Link>
                                            <Link href={'/'} onClick={handleLogout} className='flex items-center gap-2 py-1 pl-3 text-lg font-md hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white'><IoIosLogOut />Logout</Link>
                                        </div>
                                    </Popper>
                                </div>
                            )}
                        >
                            <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                                <img src="/images.png" alt="infomation" className="h-5"/>
                                <Link href={'/information'} className="">{user.user.username}</Link>
                                <BsFillCaretDownFill />
                            </div>
                        </Tippy>
                    </div>
                ) : (
                    <div className="flex items-center px-8 gap-10 bg-white">
                        <div className=""><Link href={'/auth'} className="flex items-center bg-white  hover:text-red-500"><FaUserAlt className="mr-1 "/>Login / Sign Up</Link></div>
                        <div><Link href={`/cart/${user?.user._id}`} className="flex items-center  bg-white hover:text-red-500"><FaShoppingCart className="mr-1"/>Cart</Link></div>
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
