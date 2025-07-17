"use client"
import Loading from '@/components/Loader';
import axios from '@/lib/axiosConfig';
import '@/styles/productPage.scss';
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const ProductPage = () => {
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
                console.log(data)
                setThumbnailProduct(data.thumbnail)
            } catch (error) {
                console.log(error)
            }
        }
        thumbnailImage()

    }, [])

    console.log(thumbnailProduct)
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

                <div className="thumbnail-container">
                    <div className="main-image">
                        <img src={imgSRC} alt="" />
                    </div>
                    <div className="info-container">
                        <h1>{name}</h1>
                        <p>{description}</p>
                        <div className="small-container">
                            <h2>{rating}</h2>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className="arrow flex gap-2">
                        <button onClick={rightChanged} className='right'><svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#e3e3e3"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg></button>


                        <button onClick={leftChanged} className='left'><svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#e3e3e3"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg></button>
                    </div>
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

            </div>
            <div className="header">
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
                                    <button className='bg-blue-400'>See more</button>
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

