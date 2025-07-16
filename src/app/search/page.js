"use client"
import Loading from '@/components/Loader';
import axios from '@/lib/axiosConfig';
import "@/styles/search.scss";
import { useEffect, useState } from 'react';
import { Range } from "react-range";

const searchPage = () => {

    const [values, setValues] = useState([1000, 9000]);
    const [loadings, setLoadings] = useState(false);
    const min = 0;
    const max = 10000;
    const step = 1000;


    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);


    const handleSearch = async () => {
        try {
            setLoadings(true)
            const { data } = await axios.get(`/search?q=${query}`);
            setProducts(data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoadings(false);
        }
    };

    useEffect(() => {
        handleSearch()
    }, [])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                handleSearch();
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className='SearchPage'>
            <div className="container">
                <div className="headers">
                    <div className="search">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text" placeholder='Search Anything' />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="content">
                    <div className="filter">
                        <div className="layer-1">
                            <h1>Filter </h1>
                            <div className="box">
                                <p>APPLE</p>
                                <p>SAMSUNG</p>
                                <p>APPLE</p>
                                <p>SAMSUNG</p>
                                <p>APPLE</p>
                                <p>SAMSUNG</p>
                            </div>
                        </div>
                        <div className="layer-2">
                            <h1>PRICE</h1>
                            <div className="box">
                                <div className="upper mt-2 px-2">
                                    <Range
                                        label="Select your value"
                                        step={step}
                                        min={min}
                                        max={max}
                                        values={values}
                                        onChange={(newVal) => setValues(newVal)}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "6px",
                                                    width: "90%",
                                                    backgroundColor: "black",
                                                    borderRadius: "2em"
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                key={props.key}
                                                style={{
                                                    ...props.style,
                                                    height: "16px",
                                                    width: "16px",
                                                    backgroundColor: "white",
                                                    borderRadius: "50%",

                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="values-display flex justify-between mt-4">
                                    <span>Min: ₹{values[0]}</span> To <span>Max: ₹{values[1]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="layer-3">
                            <h1>
                                Brands
                            </h1>
                            <div className="box">
                                <div className="b">
                                    <input className='check' type="checkbox" />
                                    <label>One Plus</label>
                                </div>
                                <div className="b">
                                    <input className='check' type="checkbox" />
                                    <label>Samsung</label>
                                </div>
                                <div className="b">
                                    <input className='check' type="checkbox" />
                                    <label>Vivo</label>
                                </div>
                                <div className="b">
                                    <input className='check' type="checkbox" />
                                    <label>Oppo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="data">
                        <div className="head">
                            <h1>Results</h1>
                        </div>
                        <div className="res-container">
                            {
                                loadings ? (
                                    <Loading />
                                ) : products.length === 0 ? (
                                    <span>No Product Found</span>
                                ) : (
                                        products.map((product) => (
                                            <div key={product._id} className="box">
                                                <div className="image">
                                                    <img src={product.imgSRC} alt="" />
                                                </div>
                                                <div className="info">
                                                    <h1>{product.name}</h1>
                                                    <p>{product.description}</p>
                                                    <h2>$99</h2>
                                                    <p>Rating</p>
                                                    <button>Buy</button>
                                                    <button>Add to Cart</button>
                                                </div>
                                            </div>
                                        ))
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default searchPage
