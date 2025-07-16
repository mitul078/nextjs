"use client"
import Loading from "@/components/Loader";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Nav = () => {
    const pathName = usePathname()
    const navigate = useRouter()
    
    const navigateHandle = () => {
        navigate.push("/")
    }
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        const loginStatus = JSON.parse(localStorage.getItem("isLogin"))
        setIsLogin(loginStatus === true)

        if(loginStatus === true) {
            navigate.push("/")
        }
    }, [])


    return (
        <div className='w-full h-[60px] bg-zinc-200 text-black flex items-center justify-between px-5' >
            <div className="logo">
                <h1 onClick={navigateHandle} className='text-[2rem] cursor-pointer '>LOGO</h1>
            </div>
            <div className="li flex gap-2 text-[1.2rem] items-center">
                <Suspense fallback={<Loading />}>

                    <Link href={"/"} className={`${pathName === "/" ? "text-zinc-200 bg-zinc-600 p-1 rounded" : "text-black"}`}>Home</Link>
                    <Link href={"/product"} className={`${pathName === "/product" ? "text-zinc-200 bg-zinc-600 p-1 rounded" : "text-black"}`}>Product</Link>
                    <Link href={"/about"} className={`${pathName === "/about" ? "text-zinc-200 bg-zinc-600 p-1 rounded" : "text-black"}`}>About</Link>
                    <Link href={"/contact"} className={`${pathName === "/contact" ? "text-zinc-200 bg-zinc-600 p-1 rounded" : "text-black"}`}>Contact</Link>

                    {
                        isLogin ? (
                            <Link href={"/profile"} className={`${pathName === "/profile" ? "text-zinc-200 bg-zinc-600 p-1 rounded" : "text-black"}`}>Profile</Link>
                        ) : (
                            <Link href={"/login"} className={`${pathName === "/login" ? "text-zinc-200 bg-zinc-600 p-1 rounded" : "text-black"}`}>Login</Link>
                        )
                    }

                </Suspense>
            </div>
        </div>
    )
}

export default Nav
