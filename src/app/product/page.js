"use client"
import Loading from '@/components/Loader';
import axios from '@/lib/axiosConfig';
import '@/styles/productPage.scss';
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';


const ProductPage = () => {
    const [index, setIndex] = useState(0);
    const slideRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);




    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get("/products")
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [])

    const removeProduct = async (id) => {
        try {
            await axios.delete(`/products/${id}`)
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useRouter()
    const search = () => {
        navigate.push("/search")
    }


    return (
        <div className={`ProductPage ${mounted ? "fade-in" : ""}`}>
            <div className="nav w-full h-[80px] rounded">
                <div >
                    <input onClick={search} type="text" />
                    <label >Search</label>
                </div>
            </div>

            <div className="center">
                <div className="text-center my-10 px-4">
                    <h1 className="text-4xl font-bold md:text-5xl mb-3">
                        Elevate Your Style with <span>Urban Threads</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl mb-2">
                        Trendy. Comfortable. Unapologetically You.
                    </h2>
                    <p className="max-w-3xl mx-auto  md:text-lg">
                        Discover a curated collection of premium streetwear and timeless essentials tailored for every vibe. Whether you're dressing up or keeping it casual, we’ve got you covered.
                    </p>
                </div>
                
            </div>
            <div className="header">
                <h1 className='text-[1.3rem]'>Popular Products:</h1>
            </div>
            <div className="container">
                <Suspense fallback={<Loading />}>

                    {
                        products.map((product) => (
                            <motion.div
                                initial={{
                                    scale: 1
                                }}
                                whileHover={{
                                    scale: 1.05
                                }}
                                key={product._id}
                                className="box">
                                <div className="delete"><h1 onClick={() => removeProduct(product._id)} title='Remove'>-</h1></div>
                                <div className="price"><h1>$99</h1></div>
                                <div className="image">
                                    <img src={product.imgSRC} alt="" />
                                </div>
                                <div className="info">
                                    <h1>{product.name}</h1>
                                    <span>{product.description.split(" ").slice(0, 10).join(" ")}</span>
                                    {/* <span className='text-blue-300 cursor-pointer'>{product.description.split(" ").length > 10 && "...more"}</span> */}
                                    <div className="btn">
                                        <button>Like</button>
                                        <button>See more</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }

                </Suspense>
            </div>
        </div>
    )
}

export default ProductPage

