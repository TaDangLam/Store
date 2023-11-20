'use client'
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'

const apiUser = process.env.NEXT_PUBLIC_API_LOG_OUT

const NavbarInfo = ({ user }) => {
    const router = useRouter();
    const pathname = usePathname();
    const inactiveLink = 'flex items-center justify-center w-full px-4  cursor-pointer  h-12 text-center text-lg font-bold hover:bg-slate-100 hover:rounded-t-md'
    const active = inactiveLink + ' bg-gradient-to-r from-signup-left to-signup-right rounded-md text-white';
    
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

    return ( 
        <div>
            <div className="">
                <div className="w-full text-sm font-medium text-gray-900 bg-white  rounded-xl">
                    <Link
                        href={"/information"}
                        aria-current="true"
                        className={pathname === '/information' ? active : inactiveLink}
                    >
                        Account Detail
                    </Link>
                    <Link
                        href={`/information/orderUser/${user?.user._id}`}
                        className={pathname.includes(`/information/orderUser/${user?.user._id}`) ? active : inactiveLink}
                    >
                        Order
                    </Link>
                    <Link
                        href={"/information"}
                        className={pathname.includes('/dashboard/user') ? active : inactiveLink}
                    >
                        Address
                    </Link>
                    <button onClick={handleLogout} className={inactiveLink}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default NavbarInfo;