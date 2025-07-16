import { connectToDB } from "@/lib/db";
import { userModel } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDB()
        const data = await req.json()

        const user = new userModel(data)
        await user.save()

        return NextResponse.json({
            message: "User Added"
        })
    } catch (error) {
        console.log(error)
    }
}