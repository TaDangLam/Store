'use client'
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaBlogger } from "react-icons/fa";
import { BiInfoCircle, BiChevronDown } from "react-icons/bi";
import Link from 'next/link'
import { useState } from "react";

const Footer = () => {
    


    return(
        <div className="parent-div">
            <div className=" flex items-center justify-between ">
                <div className=" grid grid-rows-1">
                    <div className="grid grid-cols-5 ">
                        <div className="flex items-center px-10 gap-10 ">
                            <div className="cursor-pointer ">
                                <Link href={'/'}><img src="/logo.jpg" alt="logo" className="w-72 h-72 rounded"/></Link>
                            </div>
                        </div>
                        <div className="py-8 items-center px-2 gap-10 ">
                            <h1 className="text-xl font-extrabold dark border-b-4 border-blue-700">VỀ CHÚNG TÔI</h1>
                            <div className="text-base pt-5 font-bold">
                                Giờ làm việc:
                                <span className="text-red-600">  8:00 - 22:00</span>
                            </div>
                            <div className="text-base mt-3 font-bold">
                                Email:
                                <span className="text-red-600">  loremipsum@gmail.com</span>
                            </div>
                            <div className="text-base mt-3 font-bold">
                                Hotline:
                                <span className="text-red-600">  0977 11 22 33</span>
                            </div>
                            
                        </div>
                        <div className=" col-start-3 col-end-5 py-8 items-center px-2 gap-10  ">
                            <h1 className="text-xl font-semibold  dark border-b-4 border-blue-700">CỬA HÀNG THIẾT BỊ ĐIỆN TỬ VÀ LINH KIỆN LK STORE</h1>
                            <div className="text-base mt-5 font-bold">
                                Showroom Cần Thơ:
                                <span className="text-red-600">  Đ.3/2, Ninh Kiều</span>
                            </div>
                            <div className=" grid grid-rows-1 self-end">
                                <div className="grid grid-cols-2 ">
                                    <div className="cursor-pointer ">
                                        <Link href={'http://online.gov.vn/Home/WebDetails/71486?refurl=https://nguyenvu.store/&AspxAutoDetectCookieSupport=1'}><img src="https://nguyenvu.store/wp-content/uploads/2020/09/logo-da-thong-bao-bo-cong-thuong.png" alt="logo" className="w-24 "/></Link>
                                    </div>
                                    <div className="cursor-pointer ">
                                        <Link href={'https://www.dmca.com/Protection/Status.aspx?ID=c496b5a8-ee34-40cd-87c1-1d1a492638fd&refurl=https://nguyenvu.store/'}><img src="https://nguyenvu.store/media/dmca-badge.png" alt="logo" className="w-24 "/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-8 items-center px-2 gap-10 py-8">
                            <h1 className="text-xl font-extrabold dark border-b-4 border-blue-700">THÔNG TIN KHÁC</h1>
                            <div className="text-base pt-5 font-bold    ">
                                <Link href={'/'} >Chính sách trả góp</Link><br/>
                                <Link href={"/"} >Chính sách bảo mật</Link><br/>
                                <Link href={"/"} >Chính sách đổi trả</Link><br/>
                                <Link href={"/"} >Chính sách vận chuyển</Link><br/>
                                <Link href={"/"} >Thỏa thuận sử dúng</Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Footer;
