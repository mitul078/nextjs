"use client"
import axios from '@/lib/axiosConfig'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Loading from '@/components/Loader'
import { useState } from 'react'

const ProductDetailPage = () => {
    const {id}= useParams()
    const [product, setProduct] = useState("")

    useEffect(() => {
        const getProduct = async()=>{
            try {
                const {data} = await axios.get(`/products/${id}`)
                setProduct(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    } , [])
    if(!product) {
        return <Loading/>
    }
    return (
        <div>
            Product Detail {id}
        </div>
    )
}

export default ProductDetailPage
