'use client'
import { useEffect, useState } from "react";
import HeaderInfo from "./components/header";
import NavbarInfo from "./components/navbar";


const InformationLayout = ({ children }) => {
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
            <div className="flex w-full gap-3">
                <div className="w-3/12"><NavbarInfo user={user}/></div>
                <div className="w-9/12 bg-slate-50 rounded-xl">{children}</div>
            </div>
        </div>
    );
}
 
export default InformationLayout;