"use client"
import Loading from "@/components/Loader";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/styles/nav.scss"
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

        if (loginStatus === true) {
            navigate.push("/")
        }
    }, [])


    return (
        <div className='nav w-full h-[60px]   flex items-center justify-between px-5' >
            <div className="logo">
                <h1 onClick={navigateHandle} className='text-[2rem] cursor-pointer text-black '>LOGO</h1>
            </div>
            <div className="li flex gap-6 text-[1.2rem] items-center">
                <Suspense fallback={<Loading />}>
                    <Link href={"/"} className={`${pathName === "/" ? " " : ""} text-black l`}>Home</Link>
                    <Link href={"/product"} className={`${pathName === "/product" ? " " : ""} text-black l` }>Product</Link>
                    <Link href={"/about"} className={`${pathName === "/about" ? " " : ""} text-black l`}>About</Link>
                    <Link href={"/contact"} className={`${pathName === "/contact" ? " " : ""} text-black l`}>Contact</Link>

                    {
                        isLogin ? (
                            <Link href={"/profile"} className={`${pathName === "/profile" ? " " : ""} text-black l`}>Profile</Link>
                        ) : (
                            <Link href={"/login"} className= "bg-blue-400 px-2 py-1 rounded text-white" >Sign-in</Link>
                        )
                    }

                </Suspense>
            </div>
        </div>
    )
}

export default Nav
