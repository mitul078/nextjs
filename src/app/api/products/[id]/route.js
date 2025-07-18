import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { productModel } from "@/models/product";
export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const { id } = params;
        await productModel.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.log(error)
    }
}

export async function GET(req , {params}) {
    try {
        await connectToDB()
        const {id} = params
        const data = await productModel.findById(id);
        return NextResponse.json({
            data
        })
    } catch (error) {
        console.log(data)
    }
}