import { connectToDB } from "@/lib/db";
import { userModel } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDB()
        const { email, password } = await req.json()
        const user = await userModel.findOne({ email, password })

        if (!user) {
            return NextResponse.json({
                message: "user not found"
            }, { status: 404 })
        }

        return NextResponse.json(user)

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "server error" }, { status: 500 }
        )
    }
}