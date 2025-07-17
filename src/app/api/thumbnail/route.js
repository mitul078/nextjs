import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { thumbnailModel } from "@/models/thumbnail"
export async function POST(req) {
    try {
        await connectToDB()
        const { name, imgSRC, description, rating } = await req.json()

        const newThumbnail = new thumbnailModel({ name, description, rating, imgSRC })
        await newThumbnail.save()
        return NextResponse.json({
            message: "Thumbnail Added"
        })

    } catch (error) {
        return NextResponse.json(
            { error: "server error" }, { status: 500 }
        )
    }
}

export async function GET(req) {
    try {
        await connectToDB()
        const thumbnail = await thumbnailModel.find()
        return NextResponse.json({
            thumbnail
        })
    } catch (error) {
        return NextResponse.json(
            { error: "server error" }, { status: 500 }
        )
    }
}