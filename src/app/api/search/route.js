import { connectToDB } from "@/lib/db";
import { productModel } from "@/models/product";
import { NextResponse } from "next/server"; // ⬅️ required for responses

export async function GET(req) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q") || "";

        if (!q) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        const results = await productModel.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
            ],
        });

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error", message: error.message },
            { status: 500 }
        );
    }
}
