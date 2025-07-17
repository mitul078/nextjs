import { connectToDB } from "@/lib/db";
import { userModel } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDB()
        const data = await req.json()
        const checkUser = await userModel.findOne({ email: data.email })


        if (checkUser) {
            return NextResponse.json({
                message: "User already exist"
            })
        }
        const user = new userModel(data)
        await user.save()

        return NextResponse.json({
            message: "User Added"
        })


    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}