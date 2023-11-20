'use client'
import Link from 'next/link'
import { useEffect, useState } from "react";
import axios from "axios";
import { FaDesktop, FaLaptop, FaMobileAlt, FaHeadphones} from "react-icons/fa";
import { CiDesktopMouse1, CiKeyboard} from "react-icons/ci";
import { MdOutlineScreenshotMonitor,  } from "react-icons/md";
import { BsCpu, BsUsbMicro } from "react-icons/bs";

const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

const NavBar = () => {
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
        axios.get(ApiCategory)
            .then(result => setCategory(result.data))
            .catch(err => console.log(err))
    }, [])
    // console.log(category)
    return(
        <div className=''>   
            <div className=''>
                {category.map(cate => {
                    return <Link href={`/category/${cate._id}`} className='flex-link'><div className='flex items-center gap-2 pl-4'>{getCategoryIcon(cate.name)} {cate.name}</div></Link> 
                })}
            </div>
        </div>
    )
}

export default NavBar;
