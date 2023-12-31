'use client'
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaBlogger, FaPhoneAlt, FaAddressCard  } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import Link from 'next/link'
import { useState } from "react";

const Footer = () => {
    


    return(
        <div className="parent-div flex items-center justify-around">
            <div className="fix-footer">
                <h2 className="text-2xl text-center underline underline-offset-2 font-semibold">ABOUT US</h2>
                <div className="my-2 flex flex-col gap-1 justify-center">
                    <div className="flex items-center gap-1"><FaPhoneAlt /> Hotline: <a href="tel:+84949859171" className="text-btn hover:underline hover:underline-offset-2">0949859171</a></div> 
                    <div className="flex items-center gap-1"><AiFillMail /> Email: <a href="mailto:tadanglam93@gmail.com" className="text-btn hover:underline hover:underline-offset-2">tadanglam93@gmail.com</a></div>
                    <div className="flex items-center gap-1"><FaAddressCard /> Address: <span href="mailto:tadanglam93@gmail.com" className="text-btn hover:underline hover:underline-offset-2">tadanglam93@gmail.com</span></div>
                </div>
            </div>
            <div className="fix-footer flex flex-col gap-2">
                <h2 className="text-2xl text-center underline underline-offset-2 mt-0 font-semibold">More Information</h2> 
                <div className="flex items-center gap-3">
                    <a href="https://www.facebook.com/profile.php?id=100010948332178" target= "_blank"><img src="/pngtree-facebook-icon-png-image_3560488.jpg" alt="logo facebook" className="img-footer"/></a>
                    <a href="https://zalo.me/0949859171" target= "_blank"><img src="/Logo-Zalo-Arc.webp" alt="logo zalo" className="img-footer"/></a>
                    <a href="https://www.tiktok.com/@MS4wLjABAAAAuEU-yoWJfjkHoVLsxLtjQ8tugsGe8luBivoIQuDDtWC1zRQUm_yMkLR6vBzbT25C" target= "_blank"><img src="/tiktok-7002866_960_720.webp" alt="logo tiktok" className="img-footer"/></a>
                    <a href="https://www.youtube.com/channel/UCdy_fNfV7IeoZXr_U6JWjWg" target= "_blank"><img src="/youtube-5830725_1280.webp" alt="logo youtube" className="img-footer"/></a>
                </div>
            </div>
        </div>
    )

}

export default Footer;
