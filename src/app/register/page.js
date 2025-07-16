"use client"
import React, { useEffect, useState } from "react";
import "@/styles/login.scss";
import { useForm } from 'react-hook-form'
import axios from "@/lib/axiosConfig";





const RegisterPage = () => {
    const [mounted, setMounted] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    useEffect(() => {
        setMounted(true);
    }, []);

    const submitHandler = async (user) => {
        try {
            await axios.post("/register", user)
            reset()
        } catch (error) {
            console.log(error)
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
                <button type="submit">Sign-up</button>
            </form>
        </div>
    );
};

export default RegisterPage;
