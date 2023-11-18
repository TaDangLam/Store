'use client'
import { useEffect, useState } from "react";
import HeaderInfo from "./components/header";
import NavbarInfo from "./components/navbar";
import NavbarOrderDetail from "./components/navbarOrderDetail";
import { usePathname } from "next/navigation";


const InformationLayout = ({ children }) => {
    const pathname = usePathname();
    const isAuthOrDashboardPage = pathname.startsWith('/information/detailOrder');
    const showHeaderAndFooter = !isAuthOrDashboardPage;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userJSON = sessionStorage.getItem('user');
        if(userJSON){
            setUser(JSON.parse(userJSON));
        }
    }, [])

    return ( 
        <div className="flex flex-col gap-5 py-5">
            <div className=""><HeaderInfo /></div>
            <div className="flex w-full gap-5">
                <div className="w-3/12">
                    {showHeaderAndFooter ? (
                            <NavbarInfo user={user}/>
                        ) : (
                            <NavbarOrderDetail />
                        )}
                </div>
                <div className={showHeaderAndFooter ? 'w-9/12 bg-slate-50 rounded-xl  px-2 py-5' : 'w-9/12'}>{children}</div>
            </div>
        </div>
    );
}
 
export default InformationLayout;