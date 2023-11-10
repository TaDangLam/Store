'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";

import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const ApiRegister = process.env.NEXT_PUBLIC_API_SIGN_UP;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const router = useRouter();

    const handleBackHome = () => {
        router.push('/');
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        if(password !== repeatPassword){
            console.log("Password no match");
            return;
        }

        try{
            const response = await axios.post(ApiRegister, {username, password});
            setUsername('');
            setPassword('');
            setRepeatPassword('');
            router.push('/auth');
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="flex bg-gradient-to-r from-login-left to-login-right items-center justify-center h-screen">
            <div className="flex h-3/4 w-4/5 shadow-signup rounded-pd">
                <div className="flex flex-col items-center justify-center gap-y-5 bg-gradient-to-r from-signup-left to-signup-right h-full w-2/5 rounded-l-pd">
                    <div className="text-4xl text-white font-bold">Hello, Friend!</div>
                    <div className="border-2 w-20 border-white"></div>
                    <div className="text-white">Fill up personal information and start journey with us</div>
                    <Link href={'/auth'} className="text-white border-2 w-36 rounded-full my-3 p-3 flex items-center justify-center hover:bg-white hover:text-signup-left">
                        Sign In
                    </Link>
                </div>
                <div className="bg-white h-full w-3/5 rounded-r-pd flex flex-col gap-y-5">
                    <div className="text-signup-left text-2xl p-4 h-1/5 font-bold cursor-pointer" onClick={handleBackHome}>LK Store</div>
                    <div className=" h-4/5 flex flex-col items-center gap-2">
                        <div className="text-signup-left text-4xl font-bold">Sign up  Account</div>
                        <div className="border-2 w-20 border-signup-left"></div>
                        <form onSubmit={handleRegister} className="my-5 flex flex-col items-center gap-4">
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
                            <div className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <AiOutlineLock className="w-1/12"/>
                                <input 
                                    type="password" 
                                    placeholder="Repeat Password" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />
                            </div>
                            
                            <button type="submit" className="bg-signup-left text-white w-36 rounded-full my-3 p-3">
                                Sign up
                            </button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Signup;
