'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Apilogin = process.env.NEXT_PUBLIC_API_LOG_IN;

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleBackHome = () => {
        router.push('/');
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Apilogin, {username, password});
            const dataLogin = response.data;
            // console.log(dataLogin)
            if(dataLogin?.role === 'admin'){
                sessionStorage.setItem('user', JSON.stringify(dataLogin));
                router.push('/dashboard')
            } else if(dataLogin?.role === 'staff'){
                sessionStorage.setItem('user', JSON.stringify(dataLogin));
                router.push('/staff')
            } else {
                sessionStorage.setItem('user', JSON.stringify(dataLogin));
                router.push('/')
            }
            
        } catch (err) {
            sessionStorage.removeItem('user');
            console.log(err);
        }
    }
    
    return(
        <div className="flex bg-gradient-to-r from-login-left to-login-right items-center justify-center h-screen ">
            <div className="bg-white flex h-3/4 w-4/5 shadow-login rounded-pd">
                <div className="bg-white h-full w-1/2 rounded-l-pd flex flex-col gap-y-5">
                    <div className="text-signup-left text-2xl p-4 h-1/5 font-bold cursor-pointer" onClick={handleBackHome}>LK Store</div>
                    <div className=" h-4/5 flex flex-col items-center gap-2">
                        <div className="text-signup-left text-4xl font-bold">Sign in  Account</div>
                        <div className="border-2 w-20 border-signup-left"></div>
                        <form onSubmit={handleLogin} className="my-5 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <AiOutlineMail className="w-1/12"/>
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <AiOutlineLock className="w-1/12"/>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex w-72 items-center justify-between">
                                <label className="flex items-center gap-1"><input type="checkbox" />Remember Me</label>
                                <Link href={'/auth/forgotPassword'} className="hover:text-signup-left">Forgot Password</Link>
                            </div>
                            <button type="submit" className="bg-signup-left text-white w-36 rounded-full my-3 p-3">
                                Sign In
                            </button>
                        </form>
                        
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-5 bg-gradient-to-r from-signup-left to-signup-right h-full w-1/2 rounded-r-pd">
                    <div className="text-4xl text-white font-bold">Hello, Friend!</div>
                    <div className="border-2 w-20 border-white"></div>
                    <div className="text-white">Fill up personal information and start journey with us</div>
                    <Link href={'/auth/signup'} className="text-white border-2 w-36 rounded-full my-3 p-3 flex items-center justify-center hover:bg-white hover:text-signup-left">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
