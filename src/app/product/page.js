"use client"
import Loading from '@/components/Loader';
import axios from '@/lib/axiosConfig';
import '@/styles/productPage.scss';
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const ProductPage = () => {
    const images = [
        "https://imgs.search.brave.com/wGuM4QwGFxeQE8ZiIR9apg7YUIZKr-BKaGBhov5RQxA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvNGst/bmF0dXJlLXNtYWxs/LWhpbGxzLXBjemRw/aWZ4Y3B5OTl4NGUu/anBn",
        "https://imgs.search.brave.com/BFiRvMmOERPUNtWqcFjp8lCG1lUapchxWAfoHu0t5wk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTA4/OTk4Ni5qcGc",
        "https://imgs.search.brave.com/bZT_eYlTciWczBXk2wnvZiikw9S4KqrVCICFQpWjXTY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvNGst/bmF0dXJlLXN1bnJp/c2UtcXFuYWM2ZnNu/cHEwOXIxaS5qcGc",
        "https://imgs.search.brave.com/_9s_3S9-ct9NNrFG4pZu2qwgcaMM_EsrMXkeW5rLmpk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9iL2MvYi8x/MjAwMTU0LTRrLXVs/dHJhLWhkLW5hdHVy/ZS13YWxscGFwZXIt/Mzg0MHgyMTYwLWZv/ci13aW5kb3dzLmpw/Zw",
        "https://imgs.search.brave.com/6ZcDZg3t1xVxetRyij3APS3eZ_S8FO9ATMnFEP6AEiI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzEy/MDUuanBn",
        "https://imgs.search.brave.com/gix3kAyRINq_yWJwUvR0YqgHdZousxJvQ8pZ0T0ajFs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hbnRv/bmdvcmxpbi5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTcv/MTIvNGstd2FsbHBh/cGVycy1uYXR1cmUt/dHJlZXMuanBn", "https://imgs.search.brave.com/yASONtgHIp05e1xWjHxxjhBhW75Gg4XXERwyMDK0a6I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJiYXQuY29t/L2ltZy8xNTA4MjY1/LW5hdHVyZS1sYWtl/LTRrLXVsdHJhLWhk/LXdhbGxwYXBlci5q/cGc"
    ];
    const [mounted, setMounted] = useState(false);
    const [text, setText] = useState('');
    const navigate = useRouter()
    const [visible, setVisible] = useState(6)
    const showMore = () => {
        setVisible((prev) => prev + 9)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && text.trim() !== "") {
            navigate.push(`/search`)
        }
    };
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

    const [thumbnailProduct, setThumbnailProduct] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const thumbnailImage = async () => {
            try {
                const { data } = await axios.get("/thumbnail")
                setThumbnailProduct(data.thumbnail)
            } catch (error) {
                console.log(error)
            }
        }
        thumbnailImage()

    }, [])
    if (thumbnailProduct.length === 0) {
        return <Loading />
    }

    const rightChanged = () => {
        setCurrentIndex((prev) => (prev + 1) % thumbnailProduct.length)
    }
    const leftChanged = () => {
        setCurrentIndex((prev) => (prev - 1 + thumbnailProduct.length) % thumbnailProduct.length)
    }


    const { name, description, imgSRC, rating } = thumbnailProduct[currentIndex]

    const navigateToDetailPage = (id) => {
        navigate.push(`/product/${id}`)
    }

    return (
        <div className={`ProductPage ${mounted ? "fade-in" : ""}`}>
            <div className="nav w-full h-[80px] rounded">
                <div >
                    <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} type="text" />
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

                <div className="img-container">
                    <div className="boxes">
                        <div className="image-box"></div>
                        <div className="image-box"></div>
                        <div className="image-box"></div>
                        <div className="image-box"></div>
                        <div className="image-box"></div>
                    </div>
                </div>




                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: .4 }}
                        className="thumbnail-container "
                    >
                        <div className="main-image">
                            <img src={imgSRC} alt="" />
                        </div>
                        <div className="info-container">
                            <h1>{name}</h1>
                            <p>{description}</p>
                            <div className="small-container">
                                <h2>Rating: {rating}/5</h2>
                                <button>See More</button>
                            </div>
                        </div>
                        <div className="wrapper"></div>

                        <div className="arrow flex gap-2">
                            <button onClick={rightChanged} className='right'><svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#e3e3e3"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg></button>


                            <button onClick={leftChanged} className='left'><svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#e3e3e3"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg></button>
                        </div>

                        <div className="design"></div>

                    </motion.div>
                </AnimatePresence>


            </div>
            <div className="header mt-10">
                <h1 className='text-[1.3rem]'>Popular Products:</h1>
            </div>
            <div className="container">
                {
                    products.length === 0 && <Loading />
                }
                {
                    products.slice(0, visible).map((product) => (
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
                                    <button onClick={() => navigateToDetailPage(product._id)} className='bg-blue-400'>See more</button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                }
                {
                    visible < products.length && (
                        <div className="col-span-full flex justify-center mt-4 ">
                            <button
                                onClick={showMore}
                                className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-900 transition"
                            >
                                Show More
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductPage

