'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

const NavbarInfo = ({ user }) => {
    const pathname = usePathname();
    const inactiveLink = 'flex items-center justify-center w-full px-4  cursor-pointer  h-12 text-center text-lg font-bold hover:bg-slate-100 hover:rounded-t-md'
    const active = inactiveLink + ' bg-gradient-to-r from-signup-left to-signup-right rounded-md text-white';
    console.log(user)
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
                    <button className="flex items-center justify-center w-full px-4  cursor-pointer  h-12 text-center text-lg font-bold">
                        Log out
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default NavbarInfo;