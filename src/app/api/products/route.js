import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { productModel } from "@/models/product";


export async function POST(req) {
    try {
        await connectToDB()
        const { name, description, imgSRC } = await req.json();
        await productModel.create({
            name, description, imgSRC
        })

        return NextResponse.json({
            message: "Product Added",
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectToDB()
        const products = await productModel.find();
        return NextResponse.json(products)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}





