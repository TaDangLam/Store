import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarOrderDetail = () => {
    const pathname = usePathname();
    const inactiveLink = 'flex items-center justify-center w-full px-4  cursor-pointer  h-12 text-center text-lg font-bold hover:bg-slate-100 hover:rounded-t-md'
    const active = inactiveLink + ' bg-gradient-to-r from-signup-left to-signup-right rounded-md text-white';
    
    return ( 
        <div>
            <div className="">
                <div className="w-full text-sm font-medium text-gray-900 bg-white  rounded-xl">
                    <div
                        aria-current="true"
                        className={active}
                    >
                        Order Detail
                    </div>
  
                    <button className="flex items-center justify-center w-full px-4  cursor-pointer  h-12 text-center text-lg font-bold">
                        Log out
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default NavbarOrderDetail;