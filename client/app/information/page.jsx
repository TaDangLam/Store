'use client'
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";


const apiUser = process.env.NEXT_PUBLIC_API_LOG_OUT;

const InfomationPage = () => {
    const router = useRouter();
    const handleLogout = async() => {
        try {
            const result = await axios.post(apiUser);
            sessionStorage.removeItem('user');
            console.log('logout successful')
            router.push('/')
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <div className="py-4">
            <div className="bg-gradient-to-r from-signup-left to-signup-right mx-4 py-4 rounded-lg ">
                <h1 className="px-4  text-3xl font-bold w-full text-white">Thông tin tài khoản</h1>
                <h2 className="px-4 text-xl font-medium italic w-full text-white">Tài khoản</h2>
            </div>
            
            <div className="flex h-full p-4 gap-5">     
                
                <div className=" w-2/6 h-full">
                    <div className="w-full text-sm font-medium text-gray-900 bg-white  ">
                        <Link href={'/information'} aria-current="true" className="flex items-center justify-center w-full px-4 text-white cursor-pointer bg-gradient-to-r from-signup-left to-signup-right dark:border-gray-600 h-12 text-center text-lg font-bold">
                            Account Detail
                        </Link>
                        <Link href={'/information'} className="flex items-center justify-center w-full px-4  cursor-pointer hover:bg-gradient-to-r from-signup-left to-signup-right  h-12 text-center text-lg font-bold">
                            Order
                        </Link>
                        <Link href={'/information'} className="flex items-center justify-center w-full px-4  cursor-pointer hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white h-12 text-center text-lg font-bold">
                            Address
                        </Link>
                        <div onClick={handleLogout} className="flex items-center justify-center w-full px-4  cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:text-blue-700 dark:border-gray-600 dark:hover:from-blue-500 dark:hover:to-cyan-500 dark:hover:text-transparent  dark:focus:text-transparent h-12 text-center text-lg font-bold">
                            Log out
                        </div>
                        
                    </div>
                </div>
                <div className="border border-solid w-4/6 h-full border-gray-950 bg-white">
                <form className="w-full p-5">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder=""/>
                        
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder=""/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text" placeholder=""/>
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6">
                            <h2 className=" text-xl  w-full mb-6 uppercase font-bold">Change password</h2>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                            <p className="text-gray-600 text-xs italic">Keep blank if you don't want to change</p>
                        </div>
                        <div className="w-full px-3 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Repeat Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="rPassword" placeholder="******************"/>
                            
                        </div>
                        <button className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500 text-white font-bold py-2 px-4 mx-3 w-36 rounded">
                            Confirm
                        </button>
                    </div>
                    
                    </form>
                </div>  
            </div>
        </div>
    )
}

export default InfomationPage;
