'use client'
import Link from 'next/link'
import { useEffect, useState } from "react";
import Tippy from '@tippyjs/react/headless';
import { useRouter } from 'next/navigation'
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaDesktop, FaLaptop, FaMobileAlt, FaHeadphones} from "react-icons/fa";
import { CiDesktopMouse1, CiKeyboard} from "react-icons/ci";
import { MdOutlineScreenshotMonitor,  } from "react-icons/md";
import { BsCpu, BsUsbMicro } from "react-icons/bs";
import { BiInfoCircle, BiChevronDown } from "react-icons/bi";
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaBlogger, FaRegAddressBook } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';

import Popper from './popper';

const apiUser = process.env.NEXT_PUBLIC_API_LOG_OUT
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    // const [searchItem, setSearchItem] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState([]);

    const getCategoryIcon = (categoryName) => {
        switch (categoryName) {
            case 'PC':
                return <FaDesktop />;
            case 'Laptop':
                return <FaLaptop />;
            case 'Mobile, Tablet, Watch':
                return <FaMobileAlt />;
            case 'Screen':
                    return <MdOutlineScreenshotMonitor />;
            case 'Component':
                    return <BsCpu />;        
            case 'Keyboard':
                return <CiKeyboard />;
            case 'Mouse':
                return <CiDesktopMouse1/>
            case 'Headphone, Loudspeaker, Micro':
                return <FaHeadphones/>
            case 'Accessory':
                return <BsUsbMicro />
            // Thêm các trường hợp khác tương ứng với biểu tượng của danh mục
            default:
                return null;
        }
    }

    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
        axios.get(ApiCategory).then(result => setCategory(result.data))
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
                <Tippy
                    interactive
                    visible
                    arrow
                    placement='bottom-start'
                    render={attrs => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            <Popper>
                                <div className='bg-white w-56 h-full py-1 border-2 rounded-md flex flex-col gap-5 '>
                                    {category.map(cate => (
                                        <Link href={`/category/${cate._id}`} className='flex'>{getCategoryIcon(cate.name)} {cate.name}</Link>
                                    ))}
                                </div>
                            </Popper>
                        </div>
                    )}
                >
                    <div className="text-xl flex gap-2 items-center hover:text-red-500">
                        <FaBars/>
                        Category
                        <BiChevronDown className="text-red-500"/>
                    </div>
                </Tippy>
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
