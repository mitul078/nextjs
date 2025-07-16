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



    const images = [
        "https://media.istockphoto.com/id/1341288649/photo/75mpix-panorama-of-beautiful-mount-ama-dablam-in-himalayas-nepal.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZQ4s-_ltnxOs8_hU_ZnPxTnaCNv-gKOImKZok15wekk=", "https://media.istockphoto.com/id/511593366/photo/tropical-jungle.webp?a=1&b=1&s=612x612&w=0&k=20&c=sN4_reR9ZyFja8Aj4oZY-j4tAykcZ36cMA67nbS0ZxQ=", "https://media.istockphoto.com/id/471132388/photo/beautiful-sunset-with-palm-trees-at-backwaters-of-kerala.webp?a=1&b=1&s=612x612&w=0&k=20&c=yer-gRayNaN3Cvb5-IINSKKkOTjXgA-GZLlJlBZTN4c=", "https://media.istockphoto.com/id/641294046/photo/aerial-view-on-red-car-on-the-road-near-tea-plantation.webp?a=1&b=1&s=612x612&w=0&k=20&c=gUhR-E2tVKoxsUm3496WUxYusCrcQcLPu2GwGOKwGEw="
    ]

    if (typeof window !== "undefined") {
        if (!window.sliderStarted) {
            window.sliderStarted = true;

            setInterval(() => {
                setIndex((prev) => (prev + 1) % images.length);
            }, 5000);
        }
    }

    // Move the slider when index changes
    if (slideRef.current) {
        slideRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
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

    if (products.length == 0) return <Loading />
    return (
        <div className='ProductPage'>
            <div className="nav w-full h-[80px] rounded">
                <div > 
                    <input onClick={search} type="text" />
                    <label >Search</label>
                </div>
            </div>
            <div className="header">
                <h1 className='text-[1.3rem]'>Popular Products:</h1>
            </div>
            <div className="center">
                <div className="images" ref={slideRef}>
                    {images.map((src, i) => (
                        <img key={i} src={src} alt={`Slide ${i}`} />
                    ))}
                </div>
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

