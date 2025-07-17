"use client"
import React, { useEffect, useState } from "react";
import "@/styles/login.scss";
import { useForm } from 'react-hook-form'
import axios from "@/lib/axiosConfig";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const [mounted, setMounted] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [loading , setLoading] = useState(false)
    const navigate = useRouter();
    useEffect(() => {
        setMounted(true);
    }, []);

    const submitHandler = async (user) => {
        setLoading(true)
        try {
            const {data}  = await axios.post("/register", user)
            if(data.message === "User already exist") {
                toast.error("User already existed ,  please try again")
            }
            else if(data.message === "User Added"){
                toast.success("Successfully Signed-up")
                reset()
                navigate.push("/login")
            }
            else{
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit(submitHandler)} className={`login-form ${mounted ? "fade-in" : ""}`}>
                <div className="input-group">
                    <input  {...register("email", { required: true })} type="email" required />
                    <label>Email</label>
                </div>
                <div className="input-group">
                    <input {...register("username", { required: true })} type="name" required />
                    <label>Username</label>
                </div>
                <div className="input-group">
                    <input {...register("password", { required: true })} type="password" required />
                    <label>Password</label>
                </div>
                <button type="submit">{loading ? "Wait Sign-up...." : "Sign-up"}</button>
            </form>
        </div>
    );
};

export default RegisterPage;
