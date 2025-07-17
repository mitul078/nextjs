"use client";
import React, { useEffect, useState } from "react";
import "@/styles/login.scss";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'
import axios from "@/lib/axiosConfig";
import Loading from "@/components/Loader";
const LoginPage = () => {
    const [mounted, setMounted] = useState(false);
    const navigate = useRouter()
    useEffect(() => {
        setMounted(true);
    }, []);
    const navigateHandler = () => {
        navigate.push("/register")
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadings, setLoadings] = useState(false)

    const getUser = async (e) => {
        e.preventDefault()
        setLoadings(true)
        
        try {
            await axios.post("/login", {
                email, password
            })
            toast.success('Login successful!')
            localStorage.setItem("isLogin", true)
            navigate.push("/")
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error('User not found. Please check your credentials.')
            }
            else if (error.response?.status === 500) {
                toast.error('Server error. Please try again later.')

            }
            else {
                toast.error('Something went wrong. Please try again.')
            }
        }
        finally {
            setLoadings(false)
        }
        if(loadings) {
            return <Loading/>
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={getUser} className={`login-form ${mounted ? "fade-in" : ""}`}>
                <h2>Login</h2>
                <div className="input-group">
                    <input disabled={loadings} value={email} onChange={((e) => setEmail(e.target.value))} type="email" required />
                    <label>Email</label>
                </div>
                <button disabled={loadings} type="submit">{loadings ? "Logging in..." : "Login"}</button>
                <div>
                    <p className="mt-1 text-end mr-7">Don't have an account <span onClick={navigateHandler} className="text-blue-600 cursor-pointer">register</span></p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
